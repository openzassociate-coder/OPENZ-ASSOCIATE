import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { openWhatsAppChat } from '../utils/whatsapp';
import { useTemplate } from '../context/TemplateContext';

export const ContactSection: React.FC = () => {
  const { t, config, isUrdu, theme } = useTemplate();

  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    city: 'Lahore',
    subject: 'General Staff Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    setSubmitted(true);
  };

  const handleSendWhatsApp = () => {
    const text = isUrdu
      ? `*رابطہ پیغام - ${config.agencyName}* 🇵🇰
--------------------------------------
👤 نام: ${formState.name}
📱 فون نمبر: ${formState.phone}
📍 شہر: ${formState.city}
📋 موضوع: ${formState.subject}

💬 پیغام:
${formState.message || 'میں ریکروٹمنٹ کونسلر سے رابطہ کرنا چاہتا ہوں۔'}`
      : `*CONTACT MESSAGE - ${config.agencyName}* 🇵🇰
--------------------------------------
👤 Name: ${formState.name}
📱 Phone: ${formState.phone}
📍 City: ${formState.city}
📋 Subject: ${formState.subject}

💬 Message:
${formState.message || 'I would like to speak with a recruitment consultant.'}`;

    openWhatsAppChat(text);
  };

  const getPrimaryButtonClasses = () => {
    if (theme === 'navy') return 'bg-blue-700 hover:bg-blue-800 text-white';
    if (theme === 'slate') return 'bg-slate-900 hover:bg-slate-800 text-white';
    return 'bg-emerald-700 hover:bg-emerald-800 text-white';
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
            <span>{t.contactBadge}</span>
            <span aria-hidden="true">·</span>
            <span>{isUrdu ? '24/7 ہیلپ لائن' : 'Available 24/7'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {t.contactTitle}
          </h2>
          <p className="mt-2 text-base text-slate-600">
            {t.contactDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Phone, WhatsApp, Email, and Addresses */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Hotline Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />

              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block mb-2">
                {isUrdu ? 'آفیشل ہیلپ لائن' : 'Official Agency Hotline'}
              </span>

              <a
                href={`tel:${config.phoneRaw}`}
                className="text-2xl sm:text-3xl font-extrabold text-white font-mono hover:text-emerald-400 transition-colors block mb-2"
              >
                📞 {config.phoneDisplay}
              </a>

              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-2 mb-6">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{isUrdu ? '💬 واٹس ایپ 24 گھنٹے دستیاب ہے' : '💬 WhatsApp Available 24/7 for Inquiries'}</span>
              </p>

              {/* Direct Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    openWhatsAppChat(
                      isUrdu
                        ? 'السلام علیکم اوپنز ایسوسی ایٹ، مجھے فوری معلومات درکار ہیں۔'
                        : 'Salam Openz Associate, I need immediate assistance regarding staff.'
                    )
                  }
                  className="py-3 px-4 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.whatsapp247}</span>
                </button>
                <a
                  href={`tel:${config.phoneRaw}`}
                  className="py-3 px-4 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>{t.callNow}</span>
                </a>
              </div>
            </div>

            {/* Email & Office Address Details */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    {t.contactEmailTitle}
                  </h4>
                  <a
                    href={`mailto:${config.email}`}
                    className="text-sm font-semibold text-slate-900 hover:text-emerald-700 transition-colors"
                  >
                    {config.email}
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    {t.contactOfficeTitle}
                  </h4>
                  <p className="text-sm text-slate-800 font-medium leading-relaxed">
                    {isUrdu ? config.addressUr : config.addressEn}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    {t.contactHoursTitle}
                  </h4>
                  <p className="text-sm text-slate-800">
                    {t.contactHoursValue}
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed Preview */}
            <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-2xs overflow-hidden">
              <div className="h-48 w-full rounded-xl overflow-hidden relative">
                <iframe
                  title="Openz Associate Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108848.42398516086!2d74.27589626249999!3d31.5102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919045b4c107447%3A0x6b845a7c731e8785!2sGulberg%2C%20Lahore!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-bold font-display text-slate-900 mb-2">
              {isUrdu ? 'ہمیں فوری آن لائن پیغام بھیجیں' : 'Send an Instant Message to Recruitment Desk'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {isUrdu
                ? 'اپنا پیغام درج کریں، ہمارے کونسلر آپ کو فون یا واٹس ایپ پر فوری جواب دیں گے۔'
                : 'Leave your inquiry and our consultant will call or message you back promptly.'}
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-bold text-slate-900 font-display">
                  {isUrdu ? 'پیغام کامیابی سے موصول ہو گیا ہے!' : 'Message Sent Successfully!'}
                </h4>
                <p className="text-sm text-slate-700 max-w-sm mx-auto">
                  {isUrdu
                    ? `شکریہ ${formState.name}۔ فوری گفتگو کے لیے نیچے واٹس ایپ کا بٹن دبائیں۔`
                    : `Thank you, ${formState.name}. For the fastest response, send your inquiry directly to our WhatsApp:`}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isUrdu ? 'واٹس ایپ پر کھولیں' : 'Open in WhatsApp'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: '',
                        phone: '',
                        city: 'Lahore',
                        subject: 'General Staff Inquiry',
                        message: '',
                      });
                    }}
                    className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl cursor-pointer"
                  >
                    {isUrdu ? 'ایک اور پیغام بھیجیں' : 'Send another message'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {t.fullNameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hammad Sheikh"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {t.whatsappLabel} *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0300-7654321"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:border-emerald-600 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {t.cityLabel}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lahore / Karachi / Islamabad"
                      value={formState.city}
                      onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {isUrdu ? 'موضوع / کیٹیگری' : 'Subject'}
                    </label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:border-emerald-600"
                    >
                      <option value="Need Domestic Maid / Nanny">
                        {isUrdu ? 'گھریلو ماسی یا نینی کی ضرورت' : 'Need Domestic Maid / Nanny'}
                      </option>
                      <option value="Need Driver / Security">
                        {isUrdu ? 'ڈرائیور یا سیکیورٹی گارڈ کی ضرورت' : 'Need Driver / Security'}
                      </option>
                      <option value="Need Patient Care Attendant">
                        {isUrdu ? 'مریض کی دیکھ بھال کے لیے اٹینڈنٹ' : 'Need Patient Care Attendant'}
                      </option>
                      <option value="International Staff Inquiry">
                        {isUrdu ? 'بین الاقوامی عملہ (فلپائنی وغیرہ)' : 'International Staff Inquiry'}
                      </option>
                      <option value="Job Seeker Query">
                        {isUrdu ? 'ملازمت کے متعلق معلومات' : 'Job Seeker Query'}
                      </option>
                      <option value="Other Inquiry">
                        {isUrdu ? 'دیگر معلومات' : 'Other Inquiry'}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {isUrdu ? 'آپ کا پیغام / سوال' : 'Your Message / Requirements'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={
                      isUrdu
                        ? 'اپنی ضرورت، خاندان کے افراد، اوقاتِ کار یا کوئی سوال تفصیل سے لکھیں...'
                        : 'Describe your requirement, preferred timings, family location, or any specific questions...'
                    }
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:border-emerald-600"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    {isUrdu
                      ? 'کال یا واٹس ایپ پر 1 سے 2 گھنٹے کے اندر جواب دیا جائے گا۔'
                      : 'Direct reply via Call or WhatsApp within 1–2 hours.'}
                  </span>
                  <button
                    type="submit"
                    className={`w-full sm:w-auto px-6 py-3 text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${getPrimaryButtonClasses()}`}
                  >
                    <Send className="w-4 h-4 text-emerald-300" />
                    <span>{t.sendMessageBtn}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
