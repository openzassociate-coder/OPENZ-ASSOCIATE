import React, { useState } from 'react';
import { useTemplate, TemplateTheme } from '../context/TemplateContext';
import {
  Palette,
  Languages,
  Settings2,
  Check,
  RotateCcw,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Download,
  X,
} from 'lucide-react';

export const TemplateToolbar: React.FC = () => {
  const {
    language,
    toggleLanguage,
    theme,
    setTheme,
    config,
    updateConfig,
    resetConfig,
    t,
    isUrdu,
    isTemplateBarOpen,
    setIsTemplateBarOpen,
  } = useTemplate();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState(config);
  const [exportedJson, setExportedJson] = useState<string | null>(null);

  const handleOpenEdit = () => {
    setFormData(config);
    setEditModalOpen(true);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(formData);
    setEditModalOpen(false);
  };

  const handleExport = () => {
    const data = {
      template: 'Openz Associate & Employment Agency Template',
      version: '2.0.0',
      theme,
      language,
      branding: config,
      exportedAt: new Date().toISOString(),
    };
    const str = JSON.stringify(data, null, 2);
    setExportedJson(str);
  };

  if (!isTemplateBarOpen) {
    return (
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setIsTemplateBarOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-full bg-slate-900 text-white shadow-xl hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{isUrdu ? 'ٹیمپلیٹ کنٹرول' : 'Template Controls'}</span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="relative z-40 bg-slate-950 text-slate-100 border-b border-slate-800 text-xs shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Badge & Template Title */}
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{t.templateBadge}</span>
            </span>
            <span className="font-medium text-slate-200 hidden sm:inline">
              {isUrdu
                ? 'مکمل ویب سائٹ ٹیمپلیٹ برائے اوپنز ایسوسی ایٹ'
                : 'Turnkey Employment Agency Website Template'}
            </span>
          </div>

          {/* Quick Controls: Language Switcher, Theme Switcher, Customizer */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60 font-semibold cursor-pointer transition-colors"
              title="Switch Language / زبان تبدیل کریں"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'English' : 'اردو (Urdu)'}</span>
            </button>

            {/* Theme Selector */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-0.5 rounded-lg">
              <span className="text-[10px] text-slate-400 px-1.5 hidden md:inline">
                {t.changeTheme}:
              </span>
              <button
                onClick={() => setTheme('emerald')}
                className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors cursor-pointer text-[11px] ${
                  theme === 'emerald'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Emerald Theme"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>{isUrdu ? 'زمرد' : 'Emerald'}</span>
              </button>

              <button
                onClick={() => setTheme('navy')}
                className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors cursor-pointer text-[11px] ${
                  theme === 'navy'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Navy Theme"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                <span>{isUrdu ? 'نیوی' : 'Navy'}</span>
              </button>

              <button
                onClick={() => setTheme('slate')}
                className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors cursor-pointer text-[11px] ${
                  theme === 'slate'
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Prestige Slate Theme"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>{isUrdu ? 'لگژری' : 'Prestige'}</span>
              </button>
            </div>

            {/* Customize Info Modal Button */}
            <button
              onClick={handleOpenEdit}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition-colors text-[11px] font-medium"
            >
              <Settings2 className="w-3.5 h-3.5 text-slate-300" />
              <span>{isUrdu ? 'ایجنسی ترامیم' : 'Edit Info'}</span>
            </button>

            {/* Export JSON */}
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition-colors text-[11px] font-medium"
              title="Export Template Data"
            >
              <Download className="w-3 h-3 text-slate-300" />
              <span className="hidden sm:inline">{isUrdu ? 'ایکسپورٹ' : 'Export'}</span>
            </button>

            {/* Collapse Toolbar */}
            <button
              onClick={() => setIsTemplateBarOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              title="Hide Template Toolbar"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Agency Info Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-bold font-display">
                  {isUrdu ? 'ٹیمپلیٹ ایجنسی کی معلومات تبدیل کریں' : 'Customize Template Branding'}
                </h3>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isUrdu ? 'ایجنسی کا نام (Agency Name)' : 'Agency Name'}
                </label>
                <input
                  type="text"
                  value={formData.agencyName}
                  onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isUrdu ? 'سب ٹائٹل / سلوگن (Tagline)' : 'Tagline / Slogan'}
                </label>
                <input
                  type="text"
                  value={formData.agencySubtitle}
                  onChange={(e) => setFormData({ ...formData, agencySubtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isUrdu ? 'فون نمبر (ڈسپلے)' : 'Phone Display'}
                  </label>
                  <input
                    type="text"
                    value={formData.phoneDisplay}
                    onChange={(e) => setFormData({ ...formData, phoneDisplay: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isUrdu ? 'واٹس ایپ نمبر (بین الاقوامی)' : 'WhatsApp Number (Digits)'}
                  </label>
                  <input
                    type="text"
                    value={formData.whatsAppNumber}
                    onChange={(e) => setFormData({ ...formData, whatsAppNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isUrdu ? 'ای میل ایڈریس' : 'Official Email'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    resetConfig();
                    setEditModalOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.resetDefaults}</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold flex items-center gap-1.5 shadow-xs"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isUrdu ? 'محفوظ کریں' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Export JSON modal */}
      {exportedJson && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="text-base font-bold font-display">
                {isUrdu ? 'ٹیمپلیٹ کنفیگریشن ڈیٹا' : 'Template Configuration JSON'}
              </h3>
              <button
                onClick={() => setExportedJson(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <textarea
              readOnly
              rows={10}
              value={exportedJson}
              className="w-full font-mono text-xs p-3 bg-slate-900 text-emerald-300 rounded-lg select-all"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(exportedJson);
                  alert(isUrdu ? 'ڈیٹا کاپی ہو گیا ہے!' : 'Template JSON copied to clipboard!');
                  setExportedJson(null);
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold"
              >
                {isUrdu ? 'کاپی کریں اور بند کریں' : 'Copy to Clipboard & Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
