import React, { useState } from 'react';
import { INITIAL_JOBS } from '../data/jobsData';
import { SALARY_BENCHMARKS, PAKISTAN_CITIES } from '../data/staffData';
import { JobListing } from '../types';
import { Briefcase, MessageCircle, MapPin, Search, ArrowUpRight, CheckCircle2, UserPlus } from 'lucide-react';
import { buildJobApplicationWhatsAppMessage, openWhatsAppChat } from '../utils/whatsapp';
import { useTemplate } from '../context/TemplateContext';

interface JobsSectionProps {
  onNavigateToJobSeeker: () => void;
}

export const JobsSection: React.FC<JobsSectionProps> = ({ onNavigateToJobSeeker }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'female' | 'male' | 'international'>('all');
  const { t, isUrdu, theme } = useTemplate();

  const filteredJobs = INITIAL_JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || job.city.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesCity && matchesCategory;
  });

  const handleApplyWhatsApp = (job: JobListing) => {
    const msg = isUrdu
      ? `*ملازمت کے لیے درخواست* 🇵🇰
اوپنز ایسوسی ایٹ اینڈ ایمپلائمنٹ سروسز (رجسٹرڈ)
--------------------------------------
السلام علیکم سر، میں درج ذیل ملازمت کے لیے درخواست دینا چاہتا ہوں:
💼 پوزیشن: ${job.title} (${job.role})
📍 شہر: ${job.city}
📝 پیکج: مارکیٹ کے مطابق / انٹرویو پر طے شدہ

برائے مہربانی مجھے رجسٹریشن اور انٹرویو کا طریقہ کار بتائیں۔`
      : `*JOB APPLICATION / INQUIRY* 🇵🇰
OPENZ ASSOCIATE & EMPLOYMENT SERVICES (R)
--------------------------------------
Salam Sir, I would like to apply for the following open position:
💼 Position: ${job.title} (${job.role})
📍 Location: ${job.city}
📝 Package: Market Competitive (Discuss on Interview)

Please guide me with the registration & interview process.`;
    openWhatsAppChat(msg);
  };

  const getThemeButtonClass = () => {
    if (theme === 'navy') return 'bg-blue-700 hover:bg-blue-800 text-white';
    if (theme === 'slate') return 'bg-slate-900 hover:bg-slate-800 text-white';
    return 'bg-emerald-700 hover:bg-emerald-800 text-white';
  };

  return (
    <section id="jobs" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
            <span>{t.jobsBadge}</span>
            <span aria-hidden="true">·</span>
            <span>{isUrdu ? 'پورے پاکستان میں ملازمتیں 🇵🇰' : 'Pakistan Nationwide 🇵🇰'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display flex items-center flex-wrap gap-2">
            <span>{t.jobsTitle}</span>
            <span role="img" aria-label="Pakistan Flag">🇵🇰</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {t.jobsDesc}
          </p>
        </div>

        {/* 1. Placement Guidelines Table */}
        <div className="mb-14 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold font-display text-white">
                {isUrdu ? 'پاکستان میں اسٹاف کی معیاری اسامیوں اور ڈیوٹی کا چارٹ' : 'Standard Staff Roles & Placement Guidelines in Pakistan'}
              </h3>
              <p className="text-xs text-slate-400">
                {isUrdu
                  ? 'لاہور، کراچی، اسلام آباد اور راولپنڈی کے تصدیق شدہ فیملی اور دفتری عہدے'
                  : 'Official guidance for domestic & professional roles across Lahore, Karachi & Islamabad.'}
              </p>
            </div>
            <button
              onClick={onNavigateToJobSeeker}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 w-fit cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>{t.registerAsCandidate}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead className="bg-slate-100/90 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="py-3 px-4 sm:px-6">{isUrdu ? 'اسٹاف کی کیٹیگری' : 'Staff Category'}</th>
                  <th scope="col" className="py-3 px-4 sm:px-6">{isUrdu ? 'معاوضہ و شرائط' : 'Compensation & Terms'}</th>
                  <th scope="col" className="py-3 px-4 sm:px-6 hidden sm:table-cell">{isUrdu ? 'نوعیت' : 'Arrangement'}</th>
                  <th scope="col" className="py-3 px-4 sm:px-6 hidden md:table-cell">{isUrdu ? 'مطلوبہ تجربہ' : 'Typical Experience'}</th>
                  <th scope="col" className="py-3 px-4 sm:px-6 text-end">{isUrdu ? 'فوری رابطہ' : 'Quick Apply'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {SALARY_BENCHMARKS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                      {item.role}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-800 font-medium text-xs sm:text-sm">
                      {isUrdu ? 'باہمی مشاورت / پرکشش' : item.salary}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-xs text-slate-600 hidden sm:table-cell">
                      {item.type}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-xs text-slate-500 hidden md:table-cell">
                      {item.exp}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-end">
                      <button
                        onClick={() =>
                          openWhatsAppChat(
                            isUrdu
                              ? `السلام علیکم اوپنز ایسوسی ایٹ، میں *${item.role}* کی نوکری کے لیے اپلائی کرنا چاہتا ہوں۔`
                              : `Salam Openz Associate, I am applying for the *${item.role}* position. Please guide me.`
                          )
                        }
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{isUrdu ? 'اپلائی' : 'Apply'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Interactive Job Search & Filter Toolbar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                {isUrdu
                  ? `دستیاب تازہ ترین نوکریاں (${filteredJobs.length})`
                  : `Current Active Vacancies (${filteredJobs.length})`}
              </h3>
              <p className="text-xs text-slate-500">
                {isUrdu
                  ? 'شریف اور تصدیق شدہ فیملیز اور اداروں میں فوری روزگار'
                  : 'Direct hiring with verified families, clinics, and corporate employers.'}
              </p>
            </div>

            {/* Search input */}
            <div className="relative min-w-[260px] sm:min-w-[320px]">
              <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.searchCityPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full ps-9 pe-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.filterAllRoles}
              </button>
              <button
                onClick={() => setSelectedCategory('female')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  selectedCategory === 'female'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.tabFemale}
              </button>
              <button
                onClick={() => setSelectedCategory('male')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  selectedCategory === 'male'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.tabMale}
              </button>
              <button
                onClick={() => setSelectedCategory('international')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  selectedCategory === 'international'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.tabInternational}
              </button>
            </div>

            {/* City dropdown */}
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-medium">{isUrdu ? 'شہر منتخب کریں:' : 'Filter City:'}</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-emerald-600"
              >
                <option value="All">{isUrdu ? 'تمام شہر (پورے پاکستان)' : 'All Cities (Pakistan)'}</option>
                {PAKISTAN_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 3. Job Listings Grid */}
        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
            <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-700">
              {isUrdu ? 'کوئی نوکری نہیں ملی' : 'No active jobs found matching your criteria'}
            </p>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              {isUrdu
                ? 'پریشان نہ ہوں! روزانہ نئی اسامیاں آتی ہیں۔ اپنا نام رجسٹر کروائیں تاکہ آپ کو کال کی جا سکے۔'
                : "Don't worry! New jobs arrive daily. Register your profile to be contacted directly."}
            </p>
            <button
              onClick={onNavigateToJobSeeker}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
            >
              {t.registerAsCandidate}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.city}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {isUrdu
                        ? job.workType === 'Live-in'
                          ? 'رہائشی'
                          : job.workType === 'Live-out'
                          ? 'ڈے ٹائم'
                          : 'دونوں'
                        : job.workType}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                    {job.title}
                  </h4>

                  <div className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                    <span className="font-medium text-emerald-800">{job.role}</span>
                    <span aria-hidden="true">·</span>
                    <span>{job.openings} {t.openingsBadge}</span>
                  </div>

                  <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100/80 mb-4">
                    <p className="text-xs text-emerald-900 font-semibold mb-0.5">
                      {isUrdu ? 'پیکج و معاوضہ:' : 'Offered Compensation:'}
                    </p>
                    <p className="text-sm sm:text-base font-bold text-emerald-800">
                      {isUrdu ? 'تجربے کے مطابق / پرکشش' : 'Competitive (Discuss on Interview)'}
                    </p>
                  </div>

                  <div className="text-xs text-slate-600 mb-4 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{job.experienceReq}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleApplyWhatsApp(job)}
                    className={`w-full py-2.5 px-4 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs ${getThemeButtonClass()}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.applyViaWhatsapp}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-200" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
