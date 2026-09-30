export type StaffRole =
  | 'Housemaid'
  | 'Babysitter'
  | 'Nanny'
  | 'Patient Care Staff'
  | 'Female Cook / Chef'
  | 'Driver'
  | 'Security Guard'
  | 'Office Boy'
  | 'Helper'
  | 'Male Cook / Chef'
  | 'Filipino Staff'
  | 'Nigerian Staff'
  | 'Domestic Couple';

export type StaffCategoryGroup = 'all' | 'female' | 'male' | 'international';

export interface StaffServiceItem {
  id: string;
  title: string;
  category: 'female' | 'male' | 'international';
  salaryRange: string;
  image: string;
  duties: string[];
  workType: 'Live-in' | 'Live-out' | 'Both Available';
  description: string;
  popularIn: string[];
}

export interface JobListing {
  id: string;
  title: string;
  role: StaffRole;
  category: 'female' | 'male' | 'international';
  salaryRange: string;
  city: string;
  workType: 'Live-in' | 'Live-out' | 'Both Available';
  experienceReq: string;
  openings: number;
  featured?: boolean;
}

export interface HireStaffRequest {
  id: string;
  createdAt: string;
  fullName: string;
  whatsappNumber: string;
  city: string;
  staffRequired: StaffRole | string;
  genderPreference: 'Female' | 'Male' | 'Any / No Preference';
  workType: 'Live-in' | 'Live-out' | 'Flexible';
  experienceRequired: string;
  salaryBudget: string;
  additionalRequirements: string;
}

export interface JobSeekerRegistration {
  id: string;
  createdAt: string;
  fullName: string;
  age: number | string;
  city: string;
  profession: StaffRole | string;
  experienceYears: string;
  expectedSalary: string;
  whatsappNumber: string;
  fileName?: string;
  notes?: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  location: string;
  roleHired: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}
