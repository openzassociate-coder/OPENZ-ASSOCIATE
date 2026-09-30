export const AGENCY_PHONE_RAW = '03457015544';
export const AGENCY_PHONE_DISPLAY = '0345-7015544';
export const AGENCY_PHONE_INTL = '+92 345 7015544';
export const AGENCY_WHATSAPP_NUMBER = '923457015544';
export const AGENCY_EMAIL = 'openzassociate@gmail.com';

export function createWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${AGENCY_WHATSAPP_NUMBER}?text=${encoded}`;
}

export function openWhatsAppChat(message: string): void {
  const url = createWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function buildHireStaffWhatsAppMessage(data: {
  fullName: string;
  whatsappNumber: string;
  city: string;
  staffRequired: string;
  genderPreference: string;
  workType: string;
  experienceRequired: string;
  salaryBudget: string;
  additionalRequirements: string;
  refCode?: string;
}): string {
  return `*NEW STAFF REQUIREMENT INQUIRY* 🇵🇰
*OPENZ ASSOCIATE & EMPLOYMENT SERVICES (R)*
--------------------------------------
📋 *Ref ID:* ${data.refCode || 'WEB-' + Math.floor(1000 + Math.random() * 9000)}
👤 *Client Name:* ${data.fullName}
📱 *Client WhatsApp:* ${data.whatsappNumber}
📍 *City:* ${data.city}

🔹 *Staff Required:* ${data.staffRequired}
🔹 *Gender Preference:* ${data.genderPreference}
🔹 *Work Type:* ${data.workType}
🔹 *Required Experience:* ${data.experienceRequired || 'As per standard'}
💰 *Salary Budget:* ${data.salaryBudget}

📝 *Additional Requirements:*
${data.additionalRequirements || 'Standard reliable & verified staff required.'}
--------------------------------------
Please share available candidate profiles & confirm interview scheduling.`;
}

export function buildJobApplicationWhatsAppMessage(data: {
  jobTitle: string;
  city: string;
  salaryRange: string;
}): string {
  return `*JOB APPLICATION / INQUIRY* 🇵🇰
*OPENZ ASSOCIATE & EMPLOYMENT SERVICES (R)*
--------------------------------------
Salam Sir, I would like to apply for the following open position:
💼 *Position:* ${data.jobTitle}
📍 *Location:* ${data.city}
💰 *Salary Range:* ${data.salaryRange}

Please guide me with the registration & interview process.`;
}

export function buildJobSeekerWhatsAppMessage(data: {
  fullName: string;
  age: string | number;
  city: string;
  profession: string;
  experienceYears: string;
  expectedSalary: string;
  whatsappNumber: string;
  notes?: string;
}): string {
  return `*NEW JOB SEEKER REGISTRATION* 🇵🇰
*OPENZ ASSOCIATE & EMPLOYMENT SERVICES (R)*
--------------------------------------
👤 *Name:* ${data.fullName}
🎂 *Age:* ${data.age} Years
📍 *City:* ${data.city}
💼 *Profession / Skill:* ${data.profession}
⏳ *Experience:* ${data.experienceYears}
💰 *Expected Salary:* ${data.expectedSalary}
📱 *WhatsApp:* ${data.whatsappNumber}

📝 *Details:*
${data.notes || 'Looking for an immediate reliable job placement.'}
--------------------------------------
I am ready for document verification and candidate interview.`;
}
