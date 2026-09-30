import React, { useState } from 'react';
import { PAKISTAN_CITIES } from '../data/staffData';
import { JobSeekerRegistration } from '../types';
import { Upload, CheckCircle2, MessageCircle, UserPlus, Phone } from 'lucide-react';
import { openWhatsAppChat } from '../utils/whatsapp';
import { useTemplate } from '../context/TemplateContext';

interface JobSeekerFormProps {
  onJobSeekerRegistered: (seeker: JobSeekerRegistration) => void;
}

export const JobSeekerForm: React.FC<JobSeekerFormProps> = ({ onJobSeekerRegistered }) => {
  const { t, config, isUrdu, theme } = useTemplate();

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    city: 'Lahore',
    customCity: '',
    profession: 'Housemaid',
    experienceYears: '2 Years',
    expectedSalary: 'PKR 35,000',
    whatsappNumber: '',
    notes: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submittedCandidate, setSubmittedCandidate] = useState<JobSeekerRegistration | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.whatsappNumber.trim()) {
      return;
    }

    const cityFinal =
      formData.city === 'Other' && formData.customCity
        ? formData.customCity
        : formData.city;

    const newCandidate: JobSeekerRegistration = {
      id: `CAND-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      fullName: formData.fullName,
      age: formData.age || 'Not specified',
      city: cityFinal,
      profession: formData.profession,
      experienceYears: formData.experienceYears,
      expectedSalary: formData.expectedSalary,
      whatsappNumber: formData.whatsappNumber,
      fileName: selectedFile ? selectedFile.name : undefined,
      notes: formData.notes,
    };

    onJobSeekerRegistered(newCandidate);
    setSubmittedCandidate(newCandidate);
  };

  const handleSendToWhatsApp = () => {
    if (!submittedCandidate) return;
    const msg = isUrdu
      ? `*امیدوار رجسٹریشن (نوکری کے لیے)* 🇵🇰
*${config.agencyName}*
--------------------------------------
👤 نام: ${submittedCandidate.fullName}
🎂 عمر: ${submittedCandidate.age} سال
📍 شہر: ${submittedCandidate.city}
💼 ہنر / پیشہ: ${submittedCandidate.profession}
⏳ تجربہ: ${submittedCandidate.experienceYears}
💰 متوقع تنخواہ: ${submittedCandidate.expectedSalary}
📱 رابطہ نمبر: ${submittedCandidate.whatsappNumber}

📝 تفصیلات:
${submittedCandidate.notes || 'میں فوری ملازمت کے لیے تیار ہوں۔ شناختی کارڈ اور ضمانت موجود ہے۔'}
--------------------------------------
برائے مہربانی مجھے انٹرویو کا وقت بتائیں۔`
      : `*NEW JOB SEEKER REGISTRATION* 🇵🇰
*${config.agencyName}*
--------------------------------------
👤 Name: ${submittedCandidate.fullName}
🎂 Age: ${submittedCandidate.age} Years
📍 City: ${submittedCandidate.city}
💼 Profession / Skill: ${submittedCandidate.profession}
⏳ Experience: ${submittedCandidate.experienceYears}
💰 Expected Salary: ${submittedCandidate.expectedSalary}
📱 WhatsApp: ${submittedCandidate.whatsappNumber}

📝 Details:
${submittedCandidate.notes || 'Looking for an immediate reliable job placement.'}
--------------------------------------
I am ready for document verification and candidate interview.`;

    openWhatsAppChat(msg);
  };

  const handleReset = () => {
    setSubmittedCandidate(null);
    setSelectedFile(null);
    setFormData({
      fullName: '',
      age: '',
      city: 'Lahore',
      customCity: '',
      profession: 'Housemaid',
      experienceYears: '2 Years',
      expectedSalary: 'PKR 35,000',
      whatsappNumber: '',
      notes: '',
    });
  };

  const getPrimaryButtonClasses = () => {
    if (theme === 'navy') return 'bg-blue-700 hover:bg-blue-800 text-white';
    if (theme === 'slate') return 'bg-slate-900 hover:bg-slate-800 text-white';
    return 'bg-emerald-700 hover:bg-emerald-800 text-white';
  };

  return (
    <section id="job-seekers" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
            <span>{t.jobSeekerBadge}</span>
            <span aria-hidden="true">·</span>
            <span>{isUrdu ? 'مفت رجسٹریشن برائے روزگار' : 'Free Job Registration'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {t.jobSeekerTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t.jobSeekerDesc}
          </p>
        </div>

        {submittedCandidate ? (
          <div className="bg-white border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center shadow-xs animate-in fade-in duration-200">
            <div className="w-14 h-14 bg-emerald-700 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              {t.seekerSuccessTitle}
            </h3>
            <p className="text-xs font-mono font-semibold text-emerald-900 mt-1">
              Roll No: {submittedCandidate.id}
            </p>
            <p className="mt-3 text-sm text-slate-700 max-w-md mx-auto">
              {t.seekerSuccessDesc}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleSendToWhatsApp}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>
                  {isUrdu
                    ? `واٹس ایپ پر اپنے کوائف بھیجیں (${config.phoneDisplay})`
                    : `Send Details to WhatsApp (${config.phoneDisplay})`}
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

            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline cursor-pointer"
              >
                {isUrdu ? 'کسی اور امیدوار کا اندراج کریں' : 'Register another worker / candidate'}
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
                  {t.seekerNameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={isUrdu ? 'مثلاً: محمد ندیم / رضیہ بی بی' : 'e.g. Muhammad Nadeem / Razia Bibi'}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.seekerAgeLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={18}
                  max={65}
                  placeholder="28"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.seekerCityLabel} <span className="text-red-500">*</span>
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
                  <option value="Other">{isUrdu ? 'دیگر شہر یا تحصیل' : 'Other City / Tehsil'}</option>
                </select>
                {formData.city === 'Other' && (
                  <input
                    type="text"
                    placeholder={isUrdu ? 'شہر کا نام لکھیں' : 'Enter city name'}
                    value={formData.customCity}
                    onChange={(e) => setFormData({ ...formData, customCity: e.target.value })}
                    className="mt-2 w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md"
                  />
                )}
              </div>

              {/* Profession */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.seekerProfessionLabel} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="Housemaid">{isUrdu ? 'گھریلو ماسی (صفائی ستھرائی)' : 'Housemaid'}</option>
                  <option value="Babysitter">{isUrdu ? 'بے بی سٹر (بچوں کی دیکھ بھال)' : 'Babysitter'}</option>
                  <option value="Nanny">{isUrdu ? 'نینی (چائلڈ کیئر)' : 'Trained Child Nanny'}</option>
                  <option value="Patient Care Staff">{isUrdu ? 'مریضوں اور بزرگوں کی اٹینڈنٹ' : 'Patient Care Staff / Attendant'}</option>
                  <option value="Female Cook / Chef">{isUrdu ? 'خواتین باورچی / کھانا پکانا' : 'Female Cook / Chef'}</option>
                  <option value="Driver">{isUrdu ? 'ڈرائیور (فیملی یا پرسنل)' : 'Driver (Personal / Family)'}</option>
                  <option value="Security Guard">{isUrdu ? 'سیکیورٹی گارڈ' : 'Security Guard'}</option>
                  <option value="Office Boy">{isUrdu ? 'آفس بوائے / پیون' : 'Office Boy / Peon'}</option>
                  <option value="Helper">{isUrdu ? 'ہیلپر / جنرل لیبر' : 'Helper / Labour'}</option>
                  <option value="Male Cook / Chef">{isUrdu ? 'مردانہ کک / باورچی' : 'Male Cook / Bawarchi'}</option>
                  <option value="Domestic Couple">{isUrdu ? 'شادی شدہ جوڑا (میاں بیوی)' : 'Domestic Couple'}</option>
                  <option value="Other">{isUrdu ? 'دیگر شعبہ' : 'Other Category'}</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.seekerExpLabel} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="Fresh / Under 1 Year">{isUrdu ? 'فریش / 1 سال سے کم' : 'Fresh / Under 1 Year'}</option>
                  <option value="1–2 Years">1–2 {isUrdu ? 'سال' : 'Years'}</option>
                  <option value="3–5 Years">3–5 {isUrdu ? 'سال (تجربہ کار)' : 'Years (Experienced)'}</option>
                  <option value="6–10 Years">6–10 {isUrdu ? 'سال (سینئر)' : 'Years (Senior)'}</option>
                  <option value="10+ Years">10+ {isUrdu ? 'سال' : 'Years'}</option>
                </select>
              </div>

              {/* Expected Salary */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.seekerExpectedSalary} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PKR 35,000 / PKR 45,000"
                  value={formData.expectedSalary}
                  onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-mono"
                />
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.seekerWhatsappLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0345-1234567"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-mono"
                />
              </div>

              {/* CV / Photo upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.seekerUploadLabel}
                </label>
                <label className="flex items-center gap-3 px-3.5 py-2.5 bg-slate-50 border border-dashed border-slate-300 rounded-lg hover:bg-slate-100/80 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-xs text-slate-600 truncate">
                    {selectedFile
                      ? selectedFile.name
                      : isUrdu
                      ? 'شناختی کارڈ یا دستاویز منتخب کریں'
                      : 'Click to select CV, Photo or CNIC picture'}
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-slate-400 mt-1">PDF, Word, JPG, PNG</p>
              </div>

              {/* Additional notes */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.seekerNotesLabel}
                </label>
                <textarea
                  rows={2}
                  placeholder={
                    isUrdu
                      ? 'پہلے کہاں کام کیا ہے، کیا رہائشی رہ سکتے ہیں، دیگر کوئی خاص بات...'
                      : 'Previous household references, live-in preference, details...'
                  }
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                ></textarea>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                <span>
                  {isUrdu
                    ? '⚠️ ضروری نوٹ: بھرتی سے قبل اصل شناختی کارڈ اور ضامن کے کوائف لازمی جمع کروانے ہوں گے۔'
                    : '⚠️ Note: Original CNIC and guarantor verification will be required before final placement.'}
                </span>
              </div>
              <button
                type="submit"
                className={`w-full sm:w-auto px-8 py-3 text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${getPrimaryButtonClasses()}`}
              >
                <UserPlus className="w-4 h-4 text-emerald-300" />
                <span>{t.submitJobSeekerBtn}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
