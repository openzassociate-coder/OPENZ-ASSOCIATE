import React, { useState } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/reviewsData';
import { Maximize2, X } from 'lucide-react';
import { useTemplate } from '../context/TemplateContext';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'office' | 'staff' | 'process'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const { t, isUrdu } = useTemplate();

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
              <span>{t.galleryBadge}</span>
              <span aria-hidden="true">·</span>
              <span>{isUrdu ? 'حقیقی آپریشنز اور عملہ' : 'Operations & Staff'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              {t.galleryTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              {t.galleryDesc}
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isUrdu ? 'تمام تصاویر' : 'All Photos'}
            </button>
            <button
              onClick={() => setActiveFilter('office')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeFilter === 'office'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isUrdu ? 'دفتر' : 'Office'}
            </button>
            <button
              onClick={() => setActiveFilter('staff')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeFilter === 'staff'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isUrdu ? 'اسٹاف اور ورکرز' : 'Staff & Workers'}
            </button>
            <button
              onClick={() => setActiveFilter('process')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeFilter === 'process'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isUrdu ? 'انٹرویو اور ٹریننگ' : 'Recruitment Process'}
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs cursor-pointer aspect-4/3 flex flex-col justify-end"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              <div className="relative z-10 p-5 text-white">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <div className="p-1.5 rounded-md bg-white/20 backdrop-blur-xs text-white group-hover:bg-emerald-600 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h4 className="text-base font-bold leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 text-white bg-black/60 rounded-full hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-16/10 sm:aspect-16/9 bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 text-white bg-slate-900">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase mb-1">
                  <span>GALLERY PREVIEW</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPhoto.category}</span>
                </div>
                <h3 className="text-xl font-bold font-display">{selectedPhoto.title}</h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
