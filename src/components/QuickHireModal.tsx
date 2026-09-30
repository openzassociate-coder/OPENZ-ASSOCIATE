import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { PAKISTAN_CITIES } from '../data/staffData';
import { HireStaffRequest } from '../types';
import { buildHireStaffWhatsAppMessage, openWhatsAppChat } from '../utils/whatsapp';
import { useTemplate } from '../context/TemplateContext';

interface QuickHireModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRole?: string;
  onSaveInquiry: (inquiry: HireStaffRequest) => void;
}

export const QuickHireModal: React.FC<QuickHireModalProps> = ({
  isOpen,
  onClose,
  preselectedRole = 'Housemaid',
  onSaveInquiry,
}) => {
  const { t, config, isUrdu, theme } = useTemplate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [role, setRole] = useState(preselectedRole);
  const [workType, setWorkType] = useState<'Live-in' | 'Live-out' | 'Flexible'>('Live-in');
  const [budget, setBudget] = useState('Standard Market Rate');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const ref = `OPZ-QCK-${Math.floor(1000 + Math.random() * 9000)}`;
    const inquiry: HireStaffRequest = {
      id: ref,
      createdAt: new Date().toISOString(),
      fullName: name,
      whatsappNumber: phone,
      city,
      staffRequired: role,
      genderPreference: 'Any / No Preference',
      workType,
      experienceRequired: 'Experienced',
      salaryBudget: budget,
      additionalRequirements: 'Quick requirement from online portal',
    };

    onSaveInquiry(inquiry);

    const msg = isUrdu
      ? `*فوری اسٹاف ہائرنگ انکوائری* 🇵🇰
*${config.agencyName}*
--------------------------------------
📋 ریفرنس: ${ref}
👤 نام: ${name}
📱 موبائل نمبر: ${phone}
📍 شہر: ${city}
🔹 مطلوبہ اسٹاف: ${role}
🔹 نوعیت: ${workType}
💰 بجٹ: ${budget}
--------------------------------------
برائے مہربانی فوری دستیاب امیدواروں کی تفصیلات شیئر کریں۔`
      : buildHireStaffWhatsAppMessage({
          fullName: name,
          whatsappNumber: phone,
          city,
          staffRequired: role,
          genderPreference: 'Preferred for role',
          workType,
          experienceRequired: 'Experienced',
          salaryBudget: budget,
          additionalRequirements: 'Please share available candidate profiles urgently.',
          refCode: ref,
        });

    openWhatsAppChat(msg);
    onClose();
  };

  const getPrimaryButtonClasses = () => {
    if (theme === 'navy') return 'bg-blue-700 hover:bg-blue-800 text-white';
    if (theme === 'slate') return 'bg-slate-900 hover:bg-slate-800 text-white';
    return 'bg-emerald-700 hover:bg-emerald-800 text-white';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-start mb-5">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
            {config.agencyName} · {isUrdu ? 'فوری آرڈر' : 'QUICK HIRE'}
          </span>
          <h3 className="text-xl font-bold font-display text-slate-900">
            {isUrdu ? 'فوری اسٹاف کی فراہمی' : 'Hire Staff in Minutes'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isUrdu
              ? 'مطلوبہ کوائف درج کریں اور فوری طور پر واٹس ایپ پر پروفائلز حاصل کریں۔'
              : 'Submit your details to immediately receive candidate profiles on WhatsApp.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              {t.fullNameLabel} *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Imran Tahir"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              {t.whatsappLabel} *
            </label>
            <input
              type="tel"
              required
              placeholder="0345-1234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:border-emerald-600 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {t.cityLabel} *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
              >
                {PAKISTAN_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {t.workTypeLabel}
              </label>
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
              >
                <option value="Live-in">{isUrdu ? 'رہائشی' : 'Live-in'}</option>
                <option value="Live-out">{isUrdu ? 'ڈے ٹائم' : 'Live-out'}</option>
                <option value="Flexible">{isUrdu ? 'لچکدار' : 'Flexible'}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              {t.staffRoleLabel}
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
            >
              <option value="Housemaid">{isUrdu ? 'گھریلو ملازمہ / ماسی' : 'Housemaid'}</option>
              <option value="Babysitter">{isUrdu ? 'بے بی سٹر' : 'Babysitter'}</option>
              <option value="Nanny">{isUrdu ? 'نینی / گورنس' : 'Educated Nanny'}</option>
              <option value="Patient Care Staff">{isUrdu ? 'مریضوں کی دیکھ بھال' : 'Patient Care Staff'}</option>
              <option value="Female Cook / Chef">{isUrdu ? 'خواتین باورچی' : 'Female Cook / Chef'}</option>
              <option value="Driver">{isUrdu ? 'ڈرائیور' : 'Personal / Family Driver'}</option>
              <option value="Security Guard">{isUrdu ? 'سیکیورٹی گارڈ' : 'Security Guard'}</option>
              <option value="Office Boy">{isUrdu ? 'آفس بوائے' : 'Office Boy'}</option>
              <option value="Helper">{isUrdu ? 'ہیلپر' : 'Helper / Labour'}</option>
              <option value="Male Cook / Chef">{isUrdu ? 'مردانہ کک' : 'Male Cook / Chef'}</option>
              <option value="Filipino Staff">{isUrdu ? 'فلپائنی اسٹاف' : 'Filipino Staff'}</option>
              <option value="Nigerian Staff">{isUrdu ? 'نائیجیرین اسٹاف' : 'Nigerian Staff'}</option>
              <option value="Domestic Couple">{isUrdu ? 'شادی شدہ جوڑا' : 'Domestic Couple'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              {t.salaryBudgetLabel}
            </label>
            <input
              type="text"
              placeholder="e.g. PKR 35,000 – 45,000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:border-emerald-600 font-mono"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className={`w-full py-3 px-4 text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${getPrimaryButtonClasses()}`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {isUrdu
                  ? `واٹس ایپ پر بھیجیں (${config.phoneDisplay})`
                  : `Forward to WhatsApp (${config.phoneDisplay})`}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
