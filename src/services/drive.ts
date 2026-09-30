export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  iconLink?: string;
  webViewLink?: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
  parents?: string[];
}

export const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3/files';
export const DRIVE_UPLOAD_BASE = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';

/**
 * List files from Google Drive
 */
export async function listDriveFiles(
  token: string,
  options?: {
    parentId?: string;
    searchQuery?: string;
    pageSize?: number;
  }
): Promise<DriveFile[]> {
  const queryParts = ["trashed = false"];

  if (options?.parentId) {
    queryParts.push(`'${options.parentId}' in parents`);
  }

  if (options?.searchQuery && options.searchQuery.trim()) {
    const escaped = options.searchQuery.replace(/'/g, "\\'");
    queryParts.push(`name contains '${escaped}'`);
  }

  const q = encodeURIComponent(queryParts.join(' and '));
  const fields = encodeURIComponent('files(id,name,mimeType,iconLink,webViewLink,size,createdTime,modifiedTime,parents)');
  const pageSize = options?.pageSize || 30;

  const res = await fetch(`${DRIVE_API_BASE}?q=${q}&fields=${fields}&pageSize=${pageSize}&orderBy=folder,modifiedTime desc`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Google Drive API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  return data.files || [];
}

/**
 * Create a new folder in Google Drive
 */
export async function createDriveFolder(
  token: string,
  folderName: string,
  parentId?: string
): Promise<DriveFile> {
  const metadata: { name: string; mimeType: string; parents?: string[] } = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };

  if (parentId) {
    metadata.parents = [parentId];
  }

  const res = await fetch(DRIVE_API_BASE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create folder: ${errorText}`);
  }

  return await res.json();
}

/**
 * Upload a text document or report to Google Drive
 */
export async function uploadTextDocumentToDrive(
  token: string,
  fileName: string,
  content: string,
  mimeType: string = 'text/plain',
  parentId?: string
): Promise<DriveFile> {
  const metadata: any = {
    name: fileName,
    mimeType: mimeType,
  };

  if (parentId) {
    metadata.parents = [parentId];
  }

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}\r\n\r\n` +
    content +
    closeDelimiter;

  const res = await fetch(DRIVE_UPLOAD_BASE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartRequestBody,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to upload document to Drive: ${errorText}`);
  }

  return await res.json();
}

/**
 * Upload a binary file (e.g. CV, photo, document) to Google Drive
 */
export async function uploadBinaryFileToDrive(
  token: string,
  file: File,
  customName?: string,
  parentId?: string
): Promise<DriveFile> {
  const metadata: any = {
    name: customName || file.name,
    mimeType: file.type || 'application/octet-stream',
  };

  if (parentId) {
    metadata.parents = [parentId];
  }

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const fileArrayBuffer = await file.arrayBuffer();

  const metadataPart = new TextEncoder().encode(
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${file.type || 'application/octet-stream'}\r\n\r\n`
  );

  const closePart = new TextEncoder().encode(closeDelimiter);

  const fullBody = new Uint8Array(metadataPart.length + fileArrayBuffer.byteLength + closePart.length);
  fullBody.set(metadataPart, 0);
  fullBody.set(new Uint8Array(fileArrayBuffer), metadataPart.length);
  fullBody.set(closePart, metadataPart.length + fileArrayBuffer.byteLength);

  const res = await fetch(DRIVE_UPLOAD_BASE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: fullBody,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to upload file to Google Drive: ${errorText}`);
  }

  return await res.json();
}

/**
 * Delete a file from Google Drive
 * CAUTION: Must always have explicit user confirmation before calling!
 */
export async function deleteDriveFile(token: string, fileId: string): Promise<boolean> {
  const res = await fetch(`${DRIVE_API_BASE}/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to delete file from Drive: ${errorText}`);
  }

  return true;
}
