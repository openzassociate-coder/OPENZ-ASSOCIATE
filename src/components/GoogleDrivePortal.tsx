import React, { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
} from '../services/auth';
import {
  listDriveFiles,
  createDriveFolder,
  uploadTextDocumentToDrive,
  uploadBinaryFileToDrive,
  deleteDriveFile,
  DriveFile,
} from '../services/drive';
import { GoogleSignInButton } from './GoogleSignInButton';
import {
  Folder,
  FileText,
  Upload,
  RefreshCw,
  Search,
  Trash2,
  ExternalLink,
  Plus,
  FolderPlus,
  ArrowLeft,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { HireStaffRequest, JobSeekerRegistration } from '../types';

interface GoogleDrivePortalProps {
  hireRequests: HireStaffRequest[];
  jobSeekers: JobSeekerRegistration[];
}

export const GoogleDrivePortal: React.FC<GoogleDrivePortalProps> = ({
  hireRequests,
  jobSeekers,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Folder navigation
  const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(undefined);
  const [folderHistory, setFolderHistory] = useState<{ id?: string; name: string }[]>([
    { id: undefined, name: 'My Google Drive' },
  ]);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // New folder dialog
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Delete Confirmation Dialog (MANDATORY User Confirmation for destructive ops)
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // File upload state
  const [uploadingFile, setUploadingFile] = useState(false);

  // Initialize Auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (loggedInUser, accessToken) => {
        setUser(loggedInUser);
        setToken(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setFiles([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const fetchFiles = useCallback(async (activeToken: string, folderId?: string, query?: string) => {
    setLoadingFiles(true);
    setErrorMsg(null);
    try {
      const results = await listDriveFiles(activeToken, {
        parentId: folderId,
        searchQuery: query,
      });
      setFiles(results);
    } catch (err: any) {
      console.error('Failed to list files:', err);
      setErrorMsg(err.message || 'Unable to fetch files from Google Drive.');
    } finally {
      setLoadingFiles(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchFiles(token, currentFolderId, searchQuery);
    }
  }, [token, currentFolderId, searchQuery, fetchFiles]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMsg(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        fetchFiles(result.accessToken, currentFolderId);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to sign in with Google.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setFiles([]);
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newFolderName.trim()) return;

    try {
      await createDriveFolder(token, newFolderName.trim(), currentFolderId);
      setNewFolderName('');
      setShowNewFolderModal(false);
      setSuccessNotice(`Folder "${newFolderName}" created in Google Drive.`);
      fetchFiles(token, currentFolderId);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create folder.');
    }
  };

  // 1-Click Setup of OPENZ Agency Vault structure
  const handleSetupAgencyWorkspace = async () => {
    if (!token) return;
    setLoadingFiles(true);
    try {
      const mainFolder = await createDriveFolder(token, 'OPENZ ASSOCIATE Agency Vault (R)');
      await createDriveFolder(token, 'Candidate CVs & CNIC Copies', mainFolder.id);
      await createDriveFolder(token, 'Client Service Agreements', mainFolder.id);
      await createDriveFolder(token, 'Monthly Staff Payroll Records', mainFolder.id);

      setSuccessNotice('Official OPENZ Agency Vault created with organized subfolders!');
      fetchFiles(token, currentFolderId);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to setup agency workspace.');
    } finally {
      setLoadingFiles(false);
    }
  };

  // Export current inquiries into Google Drive as a documented report
  const handleExportInquiriesToDrive = async () => {
    if (!token) return;
    setLoadingFiles(true);
    try {
      const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
      const reportTitle = `OPENZ_Inquiries_Report_${Date.now()}.txt`;

      let content = `==========================================================\n`;
      content += `OPENZ ASSOCIATE & EMPLOYMENT SERVICES (R)\n`;
      content += `PAKISTAN NATIONWIDE RECRUITMENT LOG\n`;
      content += `Export Date: ${timestamp} (Pakistan Time)\n`;
      content += `Agency Contact: 0345-7015544 | openzassociate@gmail.com\n`;
      content += `==========================================================\n\n`;

      content += `--- SECTION 1: CLIENT REQUIREMENTS (${hireRequests.length}) ---\n`;
      hireRequests.forEach((req, idx) => {
        content += `\n[${idx + 1}] Ref: ${req.id} | Date: ${req.createdAt}\n`;
        content += `Client Name: ${req.fullName}\n`;
        content += `WhatsApp: ${req.whatsappNumber} | City: ${req.city}\n`;
        content += `Staff Required: ${req.staffRequired} (${req.genderPreference})\n`;
        content += `Arrangement: ${req.workType} | Budget: ${req.salaryBudget}\n`;
        content += `Notes: ${req.additionalRequirements || 'None'}\n`;
        content += `----------------------------------------------------------\n`;
      });

      content += `\n--- SECTION 2: REGISTERED JOB SEEKERS (${jobSeekers.length}) ---\n`;
      jobSeekers.forEach((c, idx) => {
        content += `\n[${idx + 1}] Roll: ${c.id} | Date: ${c.createdAt}\n`;
        content += `Candidate Name: ${c.fullName} (Age: ${c.age})\n`;
        content += `City: ${c.city} | WhatsApp: ${c.whatsappNumber}\n`;
        content += `Profession: ${c.profession} | Experience: ${c.experienceYears}\n`;
        content += `Expected Salary: ${c.expectedSalary}\n`;
        content += `CV / File: ${c.fileName || 'Not attached'}\n`;
        content += `Notes: ${c.notes || 'None'}\n`;
        content += `----------------------------------------------------------\n`;
      });

      await uploadTextDocumentToDrive(token, reportTitle, content, 'text/plain', currentFolderId);
      setSuccessNotice(`Exported agency records to Google Drive as "${reportTitle}".`);
      fetchFiles(token, currentFolderId);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to export report to Google Drive.');
    } finally {
      setLoadingFiles(false);
    }
  };

  // Upload local file to Drive
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!token || !e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setUploadingFile(true);
    setErrorMsg(null);
    try {
      await uploadBinaryFileToDrive(token, file, undefined, currentFolderId);
      setSuccessNotice(`Uploaded "${file.name}" to Google Drive successfully.`);
      fetchFiles(token, currentFolderId);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to upload file.');
    } finally {
      setUploadingFile(false);
      e.target.value = '';
    }
  };

  // Folder navigation handlers
  const handleOpenFolder = (folder: DriveFile) => {
    setCurrentFolderId(folder.id);
    setFolderHistory((prev) => [...prev, { id: folder.id, name: folder.name }]);
  };

  const handleNavigateBack = (targetIndex: number) => {
    const target = folderHistory[targetIndex];
    setCurrentFolderId(target.id);
    setFolderHistory((prev) => prev.slice(0, targetIndex + 1));
  };

  // Execute Destructive Delete (With mandatory confirmation)
  const confirmDeleteFile = async () => {
    if (!token || !fileToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(token, fileToDelete.id);
      setSuccessNotice(`Deleted "${fileToDelete.name}" from Google Drive.`);
      setFileToDelete(null);
      fetchFiles(token, currentFolderId);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to delete file.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section id="google-drive" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
              <HardDrive className="w-4 h-4 text-emerald-700" />
              <span>Google Drive Integration</span>
              <span aria-hidden="true">·</span>
              <span>Official Workspace Storage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Agency Cloud Records & Document Vault
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Securely manage candidate CVs, client contracts, and verified CNIC affidavits directly with your connected Google Drive storage.
            </p>
          </div>

          {/* Auth Bar */}
          <div>
            {!user ? (
              <GoogleSignInButton
                onClick={handleLogin}
                isLoading={isLoggingIn}
                label="Connect Google Drive"
              />
            ) : (
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Google Account'}
                    className="w-8 h-8 rounded-full border border-slate-300"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-left text-xs">
                  <p className="font-bold text-slate-900 leading-tight">
                    {user.displayName || 'Google Drive Connected'}
                  </p>
                  <p className="text-slate-500 font-mono text-[11px] truncate max-w-[180px]">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-2 text-xs font-semibold text-slate-500 hover:text-slate-900 underline cursor-pointer"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notice Banners */}
        {successNotice && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs sm:text-sm text-emerald-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successNotice}</span>
            </div>
            <button
              onClick={() => setSuccessNotice(null)}
              className="text-emerald-700 font-bold ml-2 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between text-xs sm:text-sm text-red-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-red-700 font-bold ml-2 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Content Box */}
        {!user ? (
          /* When not authenticated */
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center mx-auto mb-4 text-emerald-700">
              <HardDrive className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-display text-slate-900 mb-2">
              Connect Google Drive to Access Agency Vault
            </h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
              Authenticate with your Google Account to create structured candidate folders, backup client requirements, review uploaded CVs, and generate service contracts.
            </p>
            <GoogleSignInButton
              onClick={handleLogin}
              isLoading={isLoggingIn}
              label="Sign in with Google to Access Drive"
              className="shadow-sm"
            />
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Server Storage · Direct Client Token</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>100% In-Memory Token Safety</span>
            </div>
          </div>
        ) : (
          /* When authenticated: Full Drive Workspace Manager */
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            {/* Action Bar */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleSetupAgencyWorkspace}
                  className="px-3.5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Initialize OPENZ agency folders in your Drive"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Setup Agency Vault Folders</span>
                </button>

                <button
                  onClick={handleExportInquiriesToDrive}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Export all client inquiries & job seekers as a report to Drive"
                >
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>Backup Records to Drive ({hireRequests.length + jobSeekers.length})</span>
                </button>

                <button
                  onClick={() => setShowNewFolderModal(true)}
                  className="px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Folder</span>
                </button>

                <label className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingFile ? 'Uploading...' : 'Upload File'}</span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    disabled={uploadingFile}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search in Drive..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs bg-slate-800 border border-slate-700 text-white rounded-lg focus:outline-hidden focus:border-emerald-500 w-36 sm:w-48 placeholder:text-slate-400"
                  />
                </div>

                <button
                  onClick={() => token && fetchFiles(token, currentFolderId, searchQuery)}
                  disabled={loadingFiles}
                  className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-lg cursor-pointer"
                  title="Refresh Files"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingFiles ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Folder Breadcrumbs */}
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 text-xs text-slate-600 overflow-x-auto">
              {folderHistory.map((item, index) => {
                const isLast = index === folderHistory.length - 1;
                return (
                  <React.Fragment key={index}>
                    {index > 0 && <span className="text-slate-400">/</span>}
                    <button
                      onClick={() => handleNavigateBack(index)}
                      disabled={isLast}
                      className={`cursor-pointer whitespace-nowrap ${
                        isLast
                          ? 'font-bold text-slate-900 cursor-default'
                          : 'hover:text-emerald-700 underline text-slate-600'
                      }`}
                    >
                      {item.name}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Files Grid / Table */}
            <div className="p-4 sm:p-6 min-h-[300px]">
              {loadingFiles ? (
                <div className="py-16 text-center text-slate-400 text-xs">
                  <RefreshCw className="w-8 h-8 mx-auto mb-2 text-emerald-600 animate-spin" />
                  <p>Loading files from Google Drive...</p>
                </div>
              ) : files.length === 0 ? (
                <div className="py-16 text-center text-slate-400 text-xs">
                  <Folder className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="font-semibold text-slate-600">This folder is empty</p>
                  <p className="mt-1">Click "Setup Agency Vault Folders" or "Upload File" above to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {files.map((file) => {
                    const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                    return (
                      <div
                        key={file.id}
                        className={`p-4 rounded-xl border transition-all flex flex-col justify-between group ${
                          isFolder
                            ? 'bg-amber-50/40 border-amber-200/80 hover:bg-amber-50 hover:border-amber-300 cursor-pointer'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                        }`}
                        onClick={() => {
                          if (isFolder) handleOpenFolder(file);
                        }}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="p-2 rounded-lg bg-white border border-slate-200/70 shadow-2xs">
                              {isFolder ? (
                                <Folder className="w-5 h-5 text-amber-500 fill-amber-400" />
                              ) : (
                                <FileText className="w-5 h-5 text-emerald-600" />
                              )}
                            </div>

                            {/* Actions */}
                            <div
                              className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 text-slate-400 hover:text-slate-800 rounded-md hover:bg-slate-100"
                                  title="Open in Google Drive"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                              <button
                                onClick={() => setFileToDelete(file)}
                                className="p-1 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 cursor-pointer"
                                title="Delete from Drive"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <h4 className="text-xs font-bold text-slate-900 truncate" title={file.name}>
                            {file.name}
                          </h4>

                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {isFolder ? 'Folder' : file.mimeType.split('/').pop()?.toUpperCase() || 'File'}
                          </p>
                        </div>

                        {file.modifiedTime && (
                          <div className="pt-2 mt-3 border-t border-slate-100 text-[10px] text-slate-400">
                            Modified: {new Date(file.modifiedTime).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal: Create Folder */}
        {showNewFolderModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative">
              <h3 className="text-base font-bold font-display text-slate-900 mb-2">
                Create New Folder in Google Drive
              </h3>
              <form onSubmit={handleCreateFolder} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="e.g. Verified Drivers Lahore"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:border-emerald-600"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewFolderModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer"
                  >
                    Create Folder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MANDATORY USER CONFIRMATION MODAL FOR DESTRUCTIVE OPERATIONS */}
        {fileToDelete && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-red-200">
              <div className="flex items-center gap-3 text-red-600 mb-3">
                <div className="p-2.5 bg-red-100 rounded-xl">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    Delete File from Google Drive?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Explicit confirmation required for mutating your Google Drive data.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs my-4 space-y-1">
                <p className="text-slate-500">File Name:</p>
                <p className="font-bold text-slate-900 break-all">{fileToDelete.name}</p>
                <p className="text-[11px] text-slate-500 font-mono">ID: {fileToDelete.id}</p>
              </div>

              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Are you sure you want to permanently delete this item from your Google Drive? This action cannot be undone.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setFileToDelete(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={confirmDeleteFile}
                  className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer flex items-center gap-1.5"
                >
                  {isDeleting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete File</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
