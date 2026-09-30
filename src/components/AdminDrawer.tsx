import React, { useState } from 'react';
import { X, Users, Briefcase, MessageCircle, Database, Trash2, ExternalLink, HardDrive } from 'lucide-react';
import { HireStaffRequest, JobSeekerRegistration } from '../types';
import { openWhatsAppChat } from '../utils/whatsapp';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  hireRequests: HireStaffRequest[];
  jobSeekers: JobSeekerRegistration[];
  onClearData: () => void;
  onOpenDrive?: () => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  hireRequests,
  jobSeekers,
  onClearData,
  onOpenDrive,
}) => {
  const [tab, setTab] = useState<'hire' | 'candidates'>('hire');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold font-display leading-tight">
                Agency Inquiries & Registrations Desk
              </h3>
              <p className="text-[11px] text-slate-400">
                Local CRM recording incoming client requirements & job seeker applications
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
            aria-label="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab('hire')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                tab === 'hire'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Client Requirements ({hireRequests.length})</span>
            </button>
            <button
              onClick={() => setTab('candidates')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                tab === 'candidates'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Job Seekers ({jobSeekers.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            {onOpenDrive && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDrive();
                }}
                className="px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md cursor-pointer flex items-center gap-1"
                title="Go to Google Drive Agency Vault"
              >
                <HardDrive className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline">Drive Vault</span>
              </button>
            )}

            <button
              onClick={onClearData}
              title="Clear all stored test entries"
              className="p-1.5 text-slate-500 hover:text-red-600 rounded-md hover:bg-slate-200 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {tab === 'hire' ? (
            hireRequests.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No client requirements submitted yet. Test the "Hire Staff" form to see live submissions here!
              </div>
            ) : (
              hireRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {req.id}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{req.fullName}</h4>
                    <p className="text-xs text-slate-600">
                      📍 {req.city} · 📱 {req.whatsappNumber}
                    </p>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-lg text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Staff Required:</span>
                      <span className="font-semibold text-slate-900">{req.staffRequired}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Work Arrangement:</span>
                      <span className="font-medium text-slate-800">{req.workType} ({req.genderPreference})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Budget:</span>
                      <span className="font-bold text-emerald-700">{req.salaryBudget}</span>
                    </div>
                    {req.additionalRequirements && (
                      <p className="pt-1 text-[11px] text-slate-500 border-t border-slate-200/60 italic">
                        "{req.additionalRequirements}"
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() =>
                        openWhatsAppChat(`Salam ${req.fullName}, thank you for your inquiry with Openz Associate regarding ${req.staffRequired}. We are matching available profiles for you now.`)
                      }
                      className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Reply on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))
            )
          ) : (
            jobSeekers.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No job seekers registered yet. Test the "For Job Seekers" form to view candidates here!
              </div>
            ) : (
              jobSeekers.map((seeker) => (
                <div
                  key={seeker.id}
                  className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                      {seeker.id}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(seeker.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{seeker.fullName} (Age: {seeker.age})</h4>
                    <p className="text-xs text-slate-600">
                      📍 {seeker.city} · 📱 {seeker.whatsappNumber}
                    </p>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-lg text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Profession:</span>
                      <span className="font-semibold text-emerald-800">{seeker.profession}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Experience:</span>
                      <span className="font-medium text-slate-800">{seeker.experienceYears}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Expected Salary:</span>
                      <span className="font-bold text-slate-900">{seeker.expectedSalary}</span>
                    </div>
                    {seeker.fileName && (
                      <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                        <span>Attached Document:</span>
                        <span className="font-medium text-emerald-700">{seeker.fileName}</span>
                      </div>
                    )}
                    {seeker.notes && (
                      <p className="pt-1 text-[11px] text-slate-500 italic">
                        "{seeker.notes}"
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() =>
                        openWhatsAppChat(`Salam ${seeker.fullName}, this is Openz Associate regarding your registration for ${seeker.profession}. Please come for interview and CNIC verification.`)
                      }
                      className="px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Contact Candidate</span>
                    </button>
                  </div>
                </div>
              ))
            )
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 text-center">
          Openz Associate Agency CRM · Client Data Protected under PDSP
        </div>
      </div>
    </div>
  );
};
