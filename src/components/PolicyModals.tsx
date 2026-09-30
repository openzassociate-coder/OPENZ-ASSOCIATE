import React from 'react';
import { X, ShieldAlert, FileText, Lock } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | 'disclaimer' | null;
  onClose: () => void;
}

export const PolicyModals: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            <div className="flex items-center gap-2 text-emerald-700">
              <Lock className="w-6 h-6" />
              <h3 className="text-xl font-bold font-display text-slate-900">
                Privacy Policy & Candidate Data Protection
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Last updated: March 2026 · Compliant with Pakistan Personal Data Protection Standards (PDSP)
            </p>

            <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
              <h4 className="font-bold text-slate-900">1. Information We Collect</h4>
              <p>
                OPENZ ASSOCIATE & EMPLOYMENT SERVICES (R) collects personal information from both employers (clients) and job seekers. For clients, this includes full name, WhatsApp/phone number, residential city, and staffing requirements. For candidates/job seekers, this includes full name, CNIC copy, age, contact info, photograph, qualifications, previous employment history, and guarantor references.
              </p>

              <h4 className="font-bold text-slate-900">2. Purpose of Collection</h4>
              <p>
                Candidate data is collected strictly for candidate verification, suitability screening, police record checks, and coordination of employer interviews. Employer data is used exclusively to facilitate staff matching and service agreements.
              </p>

              <h4 className="font-bold text-slate-900">3. Non-Disclosure & Confidentiality</h4>
              <p>
                We do not sell, lease, or monetize personal information. Candidate CNIC numbers and personal phone numbers are disclosed to clients only during formal interview and agreement stages.
              </p>

              <h4 className="font-bold text-slate-900">4. Data Security</h4>
              <p>
                Physical and digital records are stored securely with access restricted strictly to authorized recruitment officers.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            <div className="flex items-center gap-2 text-emerald-700">
              <FileText className="w-6 h-6" />
              <h3 className="text-xl font-bold font-display text-slate-900">
                Terms & Conditions of Service
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              OPENZ ASSOCIATE & EMPLOYMENT SERVICES (R) Service Regulations
            </p>

            <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
              <h4 className="font-bold text-slate-900">1. Recruitment Mandate</h4>
              <p>
                Openz Associate provides professional candidate screening, interview coordination, and placement support. We facilitate the introduction of suitable workers based on specifications provided by the client.
              </p>

              <h4 className="font-bold text-slate-900">2. Trial Period & Replacement Policy</h4>
              <p>
                All placements are eligible for a replacement guarantee as outlined in the individual client agreement. If a candidate leaves or fails to meet the verified skill criteria within the agreed trial period, Openz Associate provides a replacement candidate without additional agency service fees.
              </p>

              <h4 className="font-bold text-slate-900">3. Humane Treatment & Fair Wages</h4>
              <p>
                Clients agree to treat all domestic and professional staff respectfully, provide adequate rest breaks, hygienic accommodation (for live-in staff), nutritious meals, and pay agreed monthly salaries on or before the mutually agreed date each month.
              </p>

              <h4 className="font-bold text-slate-900">4. Independent Household Supervision</h4>
              <p>
                While Openz Associate conducts stringent CNIC and guarantor checks, the client is responsible for standard household oversight, personal valuables security, and day-to-day management.
              </p>
            </div>
          </div>
        )}

        {type === 'disclaimer' && (
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            <div className="flex items-center gap-2 text-amber-600">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="text-xl font-bold font-display text-slate-900">
                Important Regulatory Disclaimer
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Transparency & Domestic Staffing Scope
            </p>

            <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
              <h4 className="font-bold text-slate-900">1. Domestic Staffing Services Only</h4>
              <p>
                OPENZ ASSOCIATE & EMPLOYMENT SERVICES (R) operates as a registered domestic employment and staffing facilitation agency within Pakistan. We provide domestic housemaids, nannies, cooks, personal chauffeurs, security personnel, patient care attendants, and local office staff.
              </p>

              <h4 className="font-bold text-slate-900">2. Overseas Visa & Migration Transparency</h4>
              <p>
                In strict adherence to regulatory standards, Openz Associate does NOT claim, advertise, or charge fees for unauthorized foreign employment visas, overseas work permits, or government immigration clearances. Any overseas / international personnel (such as Filipino or Nigerian staff) featured on this platform refers exclusively to legally resident expatriate domestic workers already residing and working legally within Pakistan with valid documentation.
              </p>

              <h4 className="font-bold text-slate-900">3. Verification Responsibility</h4>
              <p>
                All background records and CNIC affidavits are verified in good faith through available local databases and physical guarantor references. We encourage employers to review physical CNICs and police clearances at the time of final agreement.
              </p>
            </div>
          </div>
        )}

        <div className="pt-4 mt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
