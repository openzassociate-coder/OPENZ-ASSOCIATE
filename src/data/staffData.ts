import { StaffServiceItem } from '../types';

export const STAFF_SERVICES: StaffServiceItem[] = [
  // Female Staff
  {
    id: 'housemaid',
    title: 'Housemaids',
    category: 'female',
    salaryRange: 'Discuss on Inquiry',
    image: '/src/assets/images/service_domestic_nanny_1790732648632.jpg',
    workType: 'Both Available',
    description: 'Thorough, honest domestic maids for daily cleaning, dusting, laundry, dishwashing, and meticulous home management.',
    duties: [
      'Comprehensive home sweeping, mopping & vacuuming',
      'Daily dishwashing, kitchen hygiene & sanitization',
      'Laundry washing, drying, folding & ironing',
      'Bed making, wardrobe organizing & general upkeep'
    ],
    popularIn: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi']
  },
  {
    id: 'babysitter',
    title: 'Babysitters',
    category: 'female',
    salaryRange: 'Discuss on Inquiry',
    image: '/src/assets/images/service_domestic_nanny_1790732648632.jpg',
    workType: 'Both Available',
    description: 'Affectionate and vigilant babysitters for infants, toddlers, and young kids with utmost hygiene and emotional care.',
    duties: [
      'Infant bottle feeding, formula preparation & burping',
      'Diaper changing, gentle bathing & skin care',
      'Safe play supervision, bedtime routines & storytime',
      'Vigilant safety monitoring inside the household'
    ],
    popularIn: ['DHA Lahore', 'Bahria Town', 'Clifton Karachi', 'Gulberg']
  },
  {
    id: 'nanny',
    title: 'Nannies',
    category: 'female',
    salaryRange: 'Discuss on Inquiry',
    image: '/src/assets/images/service_domestic_nanny_1790732648632.jpg',
    workType: 'Live-in',
    description: 'Experienced, educated child-care nannies fostering emotional growth, homework assistance, manners, and daily scheduling.',
    duties: [
      'Full-day child routine, hygiene, and school readiness',
      'Nutritious meal and snack preparation for kids',
      'Early learning activities, reading & creative play',
      'Accompanying children to school activities & doctors'
    ],
    popularIn: ['Islamabad (F & E sectors)', 'Karachi (Defence)', 'Lahore']
  },
  {
    id: 'patient-care-staff',
    title: 'Patient Care Staff / Attendants',
    category: 'female',
    salaryRange: 'Discuss on Inquiry',
    image: '/src/assets/images/service_patient_care_1790732659984.jpg',
    workType: 'Both Available',
    description: 'Compassionate, trained female caregivers for elderly parents, post-operative recovery, bedridden patients, and disability support.',
    duties: [
      'Bedside care, diapering, sponge bathing & mobility help',
      'Timely medicine dispensing according to doctor prescriptions',
      'Vital signs monitoring (Blood pressure, sugar, temperature)',
      'Physiotherapy support & compassionate companionship'
    ],
    popularIn: ['All Major Cities', 'Lahore', 'Karachi', 'Islamabad']
  },
  {
    id: 'female-cook',
    title: 'Female Cooks / Chefs',
    category: 'female',
    salaryRange: 'Discuss on Inquiry',
    image: '/src/assets/images/service_domestic_nanny_1790732648632.jpg',
    workType: 'Both Available',
    description: 'Hygienic culinary experts preparing delicious traditional Pakistani foods, diet-friendly meals, rotis, parathas, and light continental.',
    duties: [
      'Daily breakfast, lunch, and dinner preparation',
      'Authentic Pakistani gravies, biryani, vegetables & rotis',
      'Dietary restrictions (diabetic, low-oil, hypertensive)',
      'Pantry management, grocery listing & kitchen cleanliness'
    ],
    popularIn: ['Karachi', 'Lahore', 'Rawalpindi', 'Faisalabad']
  },

  // Male Staff
  {
    id: 'driver',
    title: 'Drivers (Personal & Family)',
    category: 'male',
    salaryRange: 'Discuss on Inquiry',
    image: '/src/assets/images/service_driver_security_1790732672700.jpg',
    workType: 'Both Available',
    description: 'Punctual, licensed, and polite chauffeurs for family pick & drop, school rounds, office executive transit, and inter-city travel.',
    duties: [
      'Safe, defensive driving with valid Pakistan driving license',
      'Timely school, university, and office transit schedules',
      'Daily vehicle washing, fluid checks & maintenance monitoring',
      'Complete route familiarity with GPS & city navigation'
    ],
    popularIn: ['Lahore', 'Karachi', 'Islamabad', 'Multan']
  },
  {
    id: 'security-guard',
    title: 'Security Guards',
    category: 'male',
    salaryRange: 'Discuss on Inquiry',
    image: '/src/assets/images/service_driver_security_1790732672700.jpg',
    workType: 'Both Available',
    description: 'Trained, vigilant residential and commercial security personnel. Verified CNIC, police verification, and weapon safety protocol if armed.',
    duties: [
      'Main gate access control, visitor registration & frisking',
      'Surveillance, CCTV scanning & perimeter patrolling',
      'Emergency response, asset protection & night vigilance',
      'Strict adherence to security rules and discipline'
    ],
    popularIn: ['Bungalows', 'Farmhouses', 'Commercial Plazas', 'Offices']
  },
  {
    id: 'office-boy',
    title: 'Office Boys / Peons',
    category: 'male',
    salaryRange: 'Discuss on Inquiry',
    image: '/src/assets/images/gallery_office_team_1790732686202.jpg',
    workType: 'Live-out',
    description: 'Active, polite support staff for corporate suites, clinics, law offices, and agencies. Ensures prompt refreshments and orderliness.',
    duties: [
      'Tea, coffee, water, and lunch service for staff and guests',
      'Document photocopying, scanning, filing & stationery delivery',
      'Office desk cleanliness, pantry upkeep & trash disposal',
      'Bank, courier, and outdoor commercial errand handling'
    ],
    popularIn: ['Corporate Offices', 'Clinics', 'Law Chambers', 'Banks']
  },
  {
    id: 'helper',
    title: 'Helpers / General Labour',
    category: 'male',
    salaryRange: 'Discuss on Inquiry',
    image: '/src/assets/images/service_driver_security_1790732672700.jpg',
    workType: 'Both Available',
    description: 'Energetic helpers for home maintenance, lawn care, luggage moving, storekeeping, warehouse loading, and domestic assistance.',
    duties: [
      'Heavy lifting, furniture shifting & warehouse loading',
      'Garden watering, lawn mowing & patio power washing',
      'Rooftop cleaning, water tank upkeep & general chores',
      'Support to senior technicians, drivers, or storekeepers'
    ],
    popularIn: ['Warehouses', 'Large Residences', 'Industrial Outlets']
  },
  {
    id: 'male-cook',
    title: 'Male Cooks / Master Chefs',
    category: 'male',
    salaryRange: 'Discuss on Inquiry',
    image: '/src/assets/images/hero_employment_pakistan_1790732633789.jpg',
    workType: 'Both Available',
    description: 'Professional ustads and seasoned chefs for family cooking, guest banquets, BBQ grilling, desi karahis, and multi-cuisine banqueting.',
    duties: [
      'Authentic Mughlai, BBQ, Karahi, Biryani & Chinese dishes',
      'Bulk meal planning for large families and frequent gatherings',
      'Strict food sanitization, meat temperature & storage hygiene',
      'Custom catering during Eid, Dawats, and festive functions'
    ],
    popularIn: ['Lahore', 'Karachi', 'Islamabad', 'Peshawar']
  },

  // International Staff
  {
    id: 'filipino-staff',
    title: 'Filipino Staff (Housekeepers & Nannies)',
    category: 'international',
    salaryRange: 'Discuss on Inquiry',
    image: '/src/assets/images/filipino_staff_portrait_1790746945254.jpg',
    workType: 'Live-in',
    description: 'Globally renowned for exceptional hospitality, fluent English communication, gentle childcare, and meticulous modern housekeeping.',
    duties: [
      'Fluent English-speaking home environment for children',
      'High-standard European / international housekeeping method',
      'Baby weaning, infant care milestones & Montessori support',
      'Discreet, disciplined, and refined home conduct'
    ],
    popularIn: ['Diplomatic Enclaves', 'DHA & Bahria Town', 'Expatriates']
  },
  {
    id: 'nigerian-staff',
    title: 'Nigerian Staff (Domestic & Facilities)',
    category: 'international',
    salaryRange: 'Discuss on Inquiry',
    image: '/src/assets/images/nigerian_staff_portrait_1790746959125.jpg',
    workType: 'Live-in',
    description: 'Dedicated, resilient, and English-speaking male and female personnel for large villas, estate management, and domestic support.',
    duties: [
      'Estate maintenance, deep cleaning & floor scrub care',
      'Punctual domestic assistance with English fluency',
      'Strong physical stamina for extensive household operations',
      'Long-term live-in reliability with high dedication'
    ],
    popularIn: ['Islamabad Villas', 'Karachi Mansions', 'Farmhouses']
  }
];

export const SALARY_BENCHMARKS = [
  { role: 'Maid (Housekeeping)', salary: 'Discuss on Inquiry', type: 'Live-in / Live-out', exp: '1–4 Years' },
  { role: 'Babysitter (Childcare)', salary: 'Discuss on Inquiry', type: 'Live-in / Live-out', exp: '2–6 Years' },
  { role: 'Driver (Personal / Family)', salary: 'Discuss on Inquiry', type: 'Live-out / Live-in', exp: '3–8 Years' },
  { role: 'Cook / Chef (Desi & Continental)', salary: 'Discuss on Inquiry', type: 'Both Available', exp: '3–10 Years' },
  { role: 'Helper / General Labour', salary: 'Discuss on Inquiry', type: 'Live-out / Live-in', exp: '1–3 Years' },
  { role: 'Patient Attendant / Nurse Aide', salary: 'Discuss on Inquiry', type: 'Live-in / 12h Shift', exp: '2–5 Years' },
  { role: 'Domestic Couple (Maid + Cook/Driver)', salary: 'Discuss on Inquiry', type: 'Live-in Quarter', exp: '3–7 Years' },
  { role: 'Office Boy / Commercial Peon', salary: 'Discuss on Inquiry', type: 'Live-out Day Shift', exp: '1–4 Years' },
  { role: 'Security Guard', salary: 'Discuss on Inquiry', type: '12h Shifts / 24h', exp: '2–8 Years' },
  { role: 'Filipino Housekeeper / Nanny', salary: 'Discuss on Inquiry', type: 'Live-in Contract', exp: '4+ Years' }
];

export const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Sialkot',
  'Gujranwala',
  'Quetta',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur'
];
