import { ClientReview } from '../types';

export const INITIAL_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    clientName: 'Dr. Tariq Mahmood & Family',
    location: 'DHA Phase 5, Lahore',
    roleHired: 'Patient Care Attendant',
    rating: 5,
    date: 'February 2026',
    comment: 'We urgently required a reliable female attendant for my elderly mother after her orthopedic surgery. Openz Associate provided candidate Sister Yasmeen within 24 hours. Very courteous, punctual, and well-behaved. The CNIC verification and documentation was completely transparent.',
    verified: true
  },
  {
    id: 'rev-2',
    clientName: 'Sarah Kamran (Working Mother)',
    location: 'Bahria Town Phase 7, Rawalpindi',
    roleHired: 'Trained Babysitter',
    rating: 5,
    date: 'January 2026',
    comment: 'Finding an honest babysitter in Rawalpindi/Islamabad was always stressful for us. Team Openz arranged a phone interview first and then sent candidate Bushra for a 3-day trial. She handles my 2-year-old son with genuine affection and patience. Highly recommended!',
    verified: true
  },
  {
    id: 'rev-3',
    clientName: 'Mian Usman Farooq',
    location: 'Clifton Block 4, Karachi',
    roleHired: 'Executive Family Driver',
    rating: 5,
    date: 'March 2026',
    comment: 'Driver Muhammad Aslam has been with our family for 4 months now. Clean driving record, knows Karachi routes thoroughly, never misses school duty timings, and takes great care of our vehicle maintenance. Excellent recruitment service.',
    verified: true
  },
  {
    id: 'rev-4',
    clientName: 'Zainab & Bilal Siddiqui',
    location: 'Gulberg III, Lahore',
    roleHired: 'Live-in Housemaid & Cook',
    rating: 5,
    date: 'December 2025',
    comment: 'Openz Associate solved our domestic staffing headache. The maid is very neat, respectful, and knows proper hygiene. Their 24/7 WhatsApp response is real – whenever we had questions regarding agreement terms, they answered immediately.',
    verified: true
  }
];

export interface GalleryItem {
  id: string;
  title: string;
  category: 'office' | 'staff' | 'process' | 'training';
  image: string;
  caption: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Consultation & Candidate Screening',
    category: 'office',
    image: '/src/assets/images/hero_employment_pakistan_1790732633789.jpg',
    caption: 'Direct in-person interview and document authentication in our corporate screening office.'
  },
  {
    id: 'gal-2',
    title: 'Dedicated Childcare & Babysitting Staff',
    category: 'staff',
    image: '/src/assets/images/service_domestic_nanny_1790732648632.jpg',
    caption: 'Vetted, nurturing nannies trained in child safety, gentle routines, and infant care.'
  },
  {
    id: 'gal-3',
    title: 'Specialized Senior & Patient Care Attendants',
    category: 'training',
    image: '/src/assets/images/service_patient_care_1790732659984.jpg',
    caption: 'Certified medical attendants and home care nurses offering bedside assistance across Pakistan.'
  },
  {
    id: 'gal-4',
    title: 'Licensed Chauffeurs & Security Personnel',
    category: 'staff',
    image: '/src/assets/images/service_driver_security_1790732672700.jpg',
    caption: 'Punctual personal drivers with police record checks and professional security guards.'
  },
  {
    id: 'gal-5',
    title: 'Central Registration & CNIC Verification Desk',
    category: 'process',
    image: '/src/assets/images/gallery_office_team_1790732686202.jpg',
    caption: 'Comprehensive biometric verification, guarantor checks, and client requirement matching.'
  }
];
