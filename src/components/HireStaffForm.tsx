import React, { useState, useEffect } from 'react';
import { PAKISTAN_CITIES } from '../data/staffData';
import { HireStaffRequest } from '../types';
import { Send, CheckCircle2, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { openWhatsAppChat } from '../utils/whatsapp';
import { useTemplate } from '../context/TemplateContext';

interface HireStaffFormProps {
  prefilledRole?: string;
  onInquirySubmitted: (inquiry: HireStaffRequest) => void;
}

export const HireStaffForm: React.FC<HireStaffFormProps> = ({
  prefilledRole,
  onInquirySubmitted,
}) => {
  const { t, config, isUrdu, theme } = useTemplate();

  const [formData, setFormData] = useState({
    fullName: '',
    whatsappNumber: '',
    city: 'Lahore',
    customCity: '',
    staffRequired: 'Housemaid',
    genderPreference: 'Female' as 'Female' | 'Male' | 'Any / No Preference',
    workType: 'Live-in' as 'Live-in' | 'Live-out' | 'Flexible',
    experienceRequired: '2–3 Years',
    salaryBudget: '',
    additionalRequirements: '',
  });

  const [submittedInquiry, setSubmittedInquiry] = useState<HireStaffRequest | null>(null);

  useEffect(() => {
    if (prefilledRole) {
      setFormData((prev) => ({
        ...prev,
        staffRequired: prefilledRole,
        genderPreference:
          prefilledRole.toLowerCase().includes('female') ||
          prefilledRole.toLowerCase().includes('maid') ||
          prefilledRole.toLowerCase().includes('nanny')
            ? 'Female'
            : prefilledRole.toLowerCase().includes('driver') ||
              prefilledRole.toLowerCase().includes('guard') ||
              prefilledRole.toLowerCase().includes('office boy')
            ? 'Male'
            : 'Any / No Preference',
      }));
    }
  }, [prefilledRole]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.whatsappNumber.trim()) {
      return;
    }

    const cityFinal =
      formData.city === 'Other' && formData.customCity
        ? formData.customCity
        : formData.city;

    const newInquiry: HireStaffRequest = {
      id: `OPZ-REQ-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      fullName: formData.fullName,
      whatsappNumber: formData.whatsappNumber,
      city: cityFinal,
      staffRequired: formData.staffRequired,
      genderPreference: formData.genderPreference,
      workType: formData.workType,
      experienceRequired: formData.experienceRequired,
      salaryBudget: formData.salaryBudget,
      additionalRequirements: formData.additionalRequirements,
    };

    onInquirySubmitted(newInquiry);
    setSubmittedInquiry(newInquiry);
  };

  const handleSendToWhatsApp = () => {
    if (!submittedInquiry) return;
    const msg = isUrdu
      ? `*اسٹاف کی فراہمی کے لیے نئی درخواست* 🇵🇰
*${config.agencyName}*
--------------------------------------
📋 ریفرنس کوڈ: ${submittedInquiry.id}
👤 کلائنٹ کا نام: ${submittedInquiry.fullName}
📱 رابطہ / واٹس ایپ: ${submittedInquiry.whatsappNumber}
📍 شہر / علاقہ: ${submittedInquiry.city}

🔹 مطلوبہ اسٹاف: ${submittedInquiry.staffRequired}
🔹 جنس کی ترجیح: ${submittedInquiry.genderPreference}
🔹 کام کی نوعیت: ${submittedInquiry.workType}
🔹 مطلوبہ تجربہ: ${submittedInquiry.experienceRequired}
💰 تنخواہ کا بجٹ: ${submittedInquiry.salaryBudget}

📝 اضافی ہدایات:
${submittedInquiry.additionalRequirements || 'معیاری اور تصدیق شدہ عملہ درکار ہے۔'}
--------------------------------------
برائے مہربانی فوری دستیاب امیدواروں کی پروفائلز شیئر کریں۔`
      : `*NEW STAFF REQUIREMENT INQUIRY* 🇵🇰
*${config.agencyName}*
--------------------------------------
📋 Ref ID: ${submittedInquiry.id}
👤 Client Name: ${submittedInquiry.fullName}
📱 Client WhatsApp: ${submittedInquiry.whatsappNumber}
📍 City: ${submittedInquiry.city}

🔹 Staff Required: ${submittedInquiry.staffRequired}
🔹 Gender Preference: ${submittedInquiry.genderPreference}
🔹 Work Type: ${submittedInquiry.workType}
🔹 Required Experience: ${submittedInquiry.experienceRequired}
💰 Salary Budget: ${submittedInquiry.salaryBudget}

📝 Additional Requirements:
${submittedInquiry.additionalRequirements || 'Standard reliable & verified staff required.'}
--------------------------------------
Please share available candidate profiles & confirm interview scheduling.`;

    openWhatsAppChat(msg);
  };

  const handleResetForm = () => {
    setSubmittedInquiry(null);
    setFormData({
      fullName: '',
      whatsappNumber: '',
      city: 'Lahore',
      customCity: '',
      staffRequired: 'Housemaid',
      genderPreference: 'Female',
      workType: 'Live-in',
      experienceRequired: '2–3 Years',
      salaryBudget: 'PKR 35,000 – 45,000',
      additionalRequirements: '',
    });
  };

  const getPrimaryButtonClasses = () => {
    if (theme === 'navy') return 'bg-blue-700 hover:bg-blue-800 text-white';
    if (theme === 'slate') return 'bg-slate-900 hover:bg-slate-800 text-white';
    return 'bg-emerald-700 hover:bg-emerald-800 text-white';
  };

  return (
    <section id="hire-staff" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
            <span>{t.hireBadge}</span>
            <span aria-hidden="true">·</span>
            <span>{isUrdu ? 'فوری جانچ اور ترسیل' : 'Fast Matching'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {t.hireTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t.hireDesc}
          </p>
        </div>

        {submittedInquiry ? (
          /* Confirmation card with 1-tap WhatsApp trigger */
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center animate-in fade-in duration-200">
            <div className="w-14 h-14 bg-emerald-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              {t.hireSuccessTitle}
            </h3>
            <p className="text-xs font-mono font-semibold text-emerald-900 mt-1">
              Reference ID: {submittedInquiry.id}
            </p>
            <p className="mt-3 text-sm text-slate-700 max-w-md mx-auto">
              {t.hireSuccessDesc}
            </p>

            {/* Quick action buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleSendToWhatsApp}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>
                  {t.sendToWhatsappBtn} ({config.phoneDisplay})
                </span>
              </button>
              <a
                href={`tel:${config.phoneRaw}`}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>{t.callNow}</span>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-emerald-200/80 text-center">
              <button
                onClick={handleResetForm}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline cursor-pointer"
              >
                {t.newInquiryBtn}
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.fullNameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={isUrdu ? 'مثلاً: اسد ملک / ڈاکٹر عائشہ خان' : 'e.g. Asad Malik / Dr. Ayesha Khan'}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.whatsappLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-mono"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.cityLabel} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  {PAKISTAN_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Other">{isUrdu ? 'دیگر شہر یا علاقہ' : 'Other City / Area'}</option>
                </select>
                {formData.city === 'Other' && (
                  <input
                    type="text"
                    placeholder={isUrdu ? 'اپنے شہر یا علاقے کا نام درج کریں' : 'Enter your city / area'}
                    value={formData.customCity}
                    onChange={(e) => setFormData({ ...formData, customCity: e.target.value })}
                    className="mt-2 w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md"
                  />
                )}
              </div>

              {/* Staff Required */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.staffRoleLabel} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.staffRequired}
                  onChange={(e) => setFormData({ ...formData, staffRequired: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  <optgroup label={isUrdu ? 'خواتین اسٹاف' : 'Female Staff'}>
                    <option value="Housemaid">{isUrdu ? 'گھریلو ماسی (صفائی ستھرائی)' : 'Housemaid (Cleaning & Chores)'}</option>
                    <option value="Babysitter">{isUrdu ? 'بے بی سٹر (بچوں کی دیکھ بھال)' : 'Babysitter (Toddlers & Infants)'}</option>
                    <option value="Nanny">{isUrdu ? 'نینی (تعلیم یافتہ چائلڈ کیئر)' : 'Educated Child Nanny'}</option>
                    <option value="Patient Care Staff">{isUrdu ? 'مریضوں اور بزرگوں کی نگہداشت' : 'Patient Care Staff / Attendant'}</option>
                    <option value="Female Cook / Chef">{isUrdu ? 'خواتین باورچی / شیف' : 'Female Cook / Chef'}</option>
                  </optgroup>
                  <optgroup label={isUrdu ? 'مردانہ اسٹاف' : 'Male Staff'}>
                    <option value="Driver">{isUrdu ? 'فیملی یا پرسنل ڈرائیور' : 'Personal / Family Driver'}</option>
                    <option value="Security Guard">{isUrdu ? 'سیکیورٹی گارڈ' : 'Security Guard'}</option>
                    <option value="Office Boy">{isUrdu ? 'آفس بوائے / پیون' : 'Office Boy / Peon'}</option>
                    <option value="Helper">{isUrdu ? 'ہیلپر / لیبر' : 'Helper / General Domestic Labour'}</option>
                    <option value="Male Cook / Chef">{isUrdu ? 'مردانہ شیف / باورچی' : 'Male Cook / Master Chef'}</option>
                  </optgroup>
                  <optgroup label={isUrdu ? 'خصوصی و بین الاقوامی عملہ' : 'Special & International'}>
                    <option value="Filipino Staff">{isUrdu ? 'فلپائنی ہاؤس کیپر / نینی' : 'Filipino Housekeeper / Nanny'}</option>
                    <option value="Nigerian Staff">{isUrdu ? 'نائیجیرین اسٹاف' : 'Nigerian Staff (Live-in)'}</option>
                    <option value="Domestic Couple">{isUrdu ? 'شادی شدہ جوڑا (میاں بیوی)' : 'Domestic Couple (Maid + Cook/Driver)'}</option>
                  </optgroup>
                </select>
              </div>

              {/* Gender Preference */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.genderPrefLabel}
                </label>
                <select
                  value={formData.genderPreference}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      genderPreference: e.target.value as any,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="Female">{isUrdu ? 'خاتون (Female)' : 'Female'}</option>
                  <option value="Male">{isUrdu ? 'مرد (Male)' : 'Male'}</option>
                  <option value="Any / No Preference">{isUrdu ? 'کوئی بھی / دونوں قابل قبول' : 'Any / No Preference'}</option>
                </select>
              </div>

              {/* Work Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.workTypeLabel}
                </label>
                <select
                  value={formData.workType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      workType: e.target.value as any,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="Live-in">{isUrdu ? 'رہائشی (24 گھنٹے رہائش سمیت)' : 'Live-in (Accommodation Provided)'}</option>
                  <option value="Live-out">{isUrdu ? 'ڈے ٹائم (صرف دن کے اوقات)' : 'Live-out (Day Shift / Off on night)'}</option>
                  <option value="Flexible">{isUrdu ? 'لچکدار / گفتگو کے مطابق' : 'Flexible / Discuss with Agency'}</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.experienceLabel}
                </label>
                <select
                  value={formData.experienceRequired}
                  onChange={(e) => setFormData({ ...formData, experienceRequired: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="1–2 Years">1–2 {isUrdu ? 'سال' : 'Years'}</option>
                  <option value="2–3 Years">2–3 {isUrdu ? 'سال (تجویز کردہ)' : 'Years (Recommended)'}</option>
                  <option value="4–6 Years">4–6 {isUrdu ? 'سال (سینئر تجربہ)' : 'Years (Senior)'}</option>
                  <option value="7+ Years">7+ {isUrdu ? 'سال (ماہر عملہ)' : 'Years (Expert)'}</option>
                  <option value="Any">{isUrdu ? 'کوئی بھی / فریش بھی قابلِ قبول' : 'Fresh / Fast Learner acceptable'}</option>
                </select>
              </div>

              {/* Salary Budget */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.salaryBudgetLabel}
                </label>
                <input
                  type="text"
                  placeholder={isUrdu ? 'باہمی مشاورت یا اپنا بجٹ درج کریں' : 'e.g. Discuss on interview / Your budget'}
                  value={formData.salaryBudget}
                  onChange={(e) => setFormData({ ...formData, salaryBudget: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Additional Requirements */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.additionalReqLabel}
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    isUrdu
                      ? 'کام کے مخصوص اوقات، فیملی کے افراد، کھانے کی پسند، فوری جوائننگ وغیرہ تفصیل سے لکھیں...'
                      : 'Specify working hours, family size, dietary preferences, special medical care needs, or urgent joining date...'
                  }
                  value={formData.additionalRequirements}
                  onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                ></textarea>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>
                  {isUrdu
                    ? '100% مفت رہنمائی · رجسٹریشن کی کوئی ایڈوانس فیس نہیں'
                    : '100% Free Consultation · No Upfront Registration Charges'}
                </span>
              </div>
              <button
                type="submit"
                className={`w-full sm:w-auto px-8 py-3 text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${getPrimaryButtonClasses()}`}
              >
                <Send className="w-4 h-4" />
                <span>{t.submitHireBtn}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
