import React, { useState } from 'react';
import { INITIAL_REVIEWS } from '../data/reviewsData';
import { ClientReview } from '../types';
import { Star, MessageSquarePlus, ShieldCheck, MapPin, CheckCircle, X } from 'lucide-react';
import { useTemplate } from '../context/TemplateContext';

export const ReviewsSection: React.FC = () => {
  const { t, isUrdu } = useTemplate();
  const [reviews, setReviews] = useState<ClientReview[]>(() => {
    const saved = localStorage.getItem('openz_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_REVIEWS;
      }
    }
    return INITIAL_REVIEWS;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    location: '',
    roleHired: 'Housemaid',
    rating: 5,
    comment: '',
  });
  const [successMsg, setSuccessMsg] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const reviewObj: ClientReview = {
      id: `rev-${Date.now()}`,
      clientName: newReview.name,
      location: newReview.location || (isUrdu ? 'پاکستان' : 'Pakistan'),
      roleHired: newReview.roleHired,
      rating: newReview.rating,
      date: isUrdu ? 'حال ہی میں' : 'Just now',
      comment: newReview.comment,
      verified: true,
    };

    const updated = [reviewObj, ...reviews];
    setReviews(updated);
    localStorage.setItem('openz_reviews', JSON.stringify(updated));

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setModalOpen(false);
      setNewReview({
        name: '',
        location: '',
        roleHired: 'Housemaid',
        rating: 5,
        comment: '',
      });
    }, 1500);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
              <span>{t.reviewsBadge}</span>
              <span aria-hidden="true">·</span>
              <span>{isUrdu ? 'حقیقی کسٹمرز کے تاثرات' : 'Authentic Family Feedback'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              {t.reviewsTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              {t.reviewsDesc}
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-2 w-fit cursor-pointer shadow-2xs"
          >
            <MessageSquarePlus className="w-4 h-4 text-emerald-700" />
            <span>{isUrdu ? 'اپنی رائے درج کریں' : 'Leave a Review'}</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{rev.date}</span>
                </div>

                {/* Comment quote */}
                <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-4">
                  “{rev.comment}”
                </blockquote>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{rev.clientName}</span>
                    {rev.verified && (
                      <span title="Verified Client" className="inline-flex">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </span>
                    )}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{rev.location}</span>
                  </div>
                </div>

                <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                  {rev.roleHired}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal to add review */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold font-display text-slate-900 mb-1">
                {isUrdu ? 'اوپنز ایسوسی ایٹ کے ساتھ اپنا تجربہ بیان کریں' : 'Share Your Experience'}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {isUrdu
                  ? 'آپ کی رائے سے دیگر خاندانوں کو بااعتماد اسٹاف کے انتخاب میں مدد ملتی ہے۔'
                  : 'Your feedback helps other Pakistani families hire with confidence.'}
              </p>

              {successMsg ? (
                <div className="p-6 text-center bg-emerald-50 text-emerald-800 rounded-xl">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                  <p className="text-sm font-bold">
                    {isUrdu ? 'شکریہ! آپ کا ریویو شامل کر لیا گیا ہے۔' : 'Thank you! Your review has been added.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {isUrdu ? 'آپ کا نام یا فیملی کا نام *' : 'Your Name / Family Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mian Tariq & Family"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        {isUrdu ? 'شہر / علاقہ *' : 'Location / City *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. DHA Phase 5, Lahore"
                        value={newReview.location}
                        onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        {isUrdu ? 'حاصل کردہ اسٹاف *' : 'Staff Hired *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Housemaid / Driver"
                        value={newReview.roleHired}
                        onChange={(e) => setNewReview({ ...newReview, roleHired: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {isUrdu ? 'ریٹنگ (1 سے 5 ستارے)' : 'Rating (1 to 5 Stars)'}
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: s })}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              s <= newReview.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-semibold text-slate-600 ml-2">
                        {newReview.rating} / 5
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {isUrdu ? 'آپ کی رائے اور تجربہ *' : 'Your Review / Experience *'}
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={
                        isUrdu
                          ? 'ملازم کے اخلاق، پابندی وقت اور ایجنسی کے تعاون کے بارے میں لکھیں...'
                          : 'Write your genuine experience regarding punctuality, candidate behavior, and agency coordination...'
                      }
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:border-emerald-600"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
                    >
                      {isUrdu ? 'ریویو جمع کروائیں' : 'Submit Review'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
