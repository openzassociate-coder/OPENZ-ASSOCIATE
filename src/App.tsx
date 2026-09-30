import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PremiumStaffSection } from './components/PremiumStaffSection';
import { ServicesSection } from './components/ServicesSection';
import { JobsSection } from './components/JobsSection';
import { HireStaffForm } from './components/HireStaffForm';
import { JobSeekerForm } from './components/JobSeekerForm';
import { AboutSection } from './components/AboutSection';
import { RecruitmentProcess } from './components/RecruitmentProcess';
import { WhyChooseUs } from './components/WhyChooseUs';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { PolicyModals } from './components/PolicyModals';
import { QuickHireModal } from './components/QuickHireModal';
import { AdminDrawer } from './components/AdminDrawer';
import { GoogleDrivePortal } from './components/GoogleDrivePortal';
import { TemplateToolbar } from './components/TemplateToolbar';
import { TemplateProvider, useTemplate } from './context/TemplateContext';
import { HireStaffRequest, JobSeekerRegistration } from './types';
import { Database } from 'lucide-react';

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [prefilledHireRole, setPrefilledHireRole] = useState<string>('');
  const [quickModalOpen, setQuickModalOpen] = useState(false);
  const [adminDrawerOpen, setAdminDrawerOpen] = useState(false);
  const [policyModalType, setPolicyModalType] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);
  const { isUrdu } = useTemplate();

  // Inquiries State (Client Hire Requests)
  const [hireRequests, setHireRequests] = useState<HireStaffRequest[]>(() => {
    const saved = localStorage.getItem('openz_hire_requests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    // Seed initial demo inquiry for illustration
    return [
      {
        id: 'OPZ-REQ-1082',
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
        fullName: 'Chaudhry Kamran & Family',
        whatsappNumber: '0300-4829102',
        city: 'Lahore (DHA Phase 5)',
        staffRequired: 'Babysitter',
        genderPreference: 'Female',
        workType: 'Live-in',
        experienceRequired: '3+ Years',
        salaryBudget: 'PKR 45,000 – 55,000',
        additionalRequirements: 'Experienced in infant care, hygienic feeding, and polite manners.',
      },
    ];
  });

  // Candidate Registrations State (Job Seekers)
  const [jobSeekers, setJobSeekers] = useState<JobSeekerRegistration[]>(() => {
    const saved = localStorage.getItem('openz_job_seekers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 'CAND-5021',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        fullName: 'Muhammad Tariq',
        age: 34,
        city: 'Islamabad / Rawalpindi',
        profession: 'Driver',
        experienceYears: '6 Years',
        expectedSalary: 'PKR 50,000',
        whatsappNumber: '0345-5921820',
        fileName: 'Tariq_Driving_License_Copy.pdf',
        notes: 'Personal driver with valid LTV license and verified Islamabad residence.',
      },
    ];
  });

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem('openz_hire_requests', JSON.stringify(hireRequests));
  }, [hireRequests]);

  useEffect(() => {
    localStorage.setItem('openz_job_seekers', JSON.stringify(jobSeekers));
  }, [jobSeekers]);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectRoleForHire = (roleTitle: string) => {
    setPrefilledHireRole(roleTitle);
    scrollToSection('hire-staff');
  };

  const handleHireInquirySubmitted = (inquiry: HireStaffRequest) => {
    setHireRequests((prev) => [inquiry, ...prev]);
  };

  const handleJobSeekerRegistered = (seeker: JobSeekerRegistration) => {
    setJobSeekers((prev) => [seeker, ...prev]);
  };

  const handleClearAdminData = () => {
    if (window.confirm('Are you sure you want to clear test inquiries?')) {
      setHireRequests([]);
      setJobSeekers([]);
      localStorage.removeItem('openz_hire_requests');
      localStorage.removeItem('openz_job_seekers');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      {/* 0. Top Template Toolbar (Interactive customization bar) */}
      <TemplateToolbar />

      {/* 1. Primary Header Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenHireModal={() => setQuickModalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Banner */}
        <Hero
          onNavigate={scrollToSection}
          onOpenHireModal={() => setQuickModalOpen(true)}
        />

        {/* 2.5. Dedicated Luxury Section: Premium Staff Services (Filipino, Nigerian, Housemaids, Nannies, Cooks, Patient Care, Domestic Staff) */}
        <PremiumStaffSection onSelectRoleForHire={handleSelectRoleForHire} />

        {/* 3. Our Services (Female, Male, International Staff) */}
        <ServicesSection onSelectRoleForHire={handleSelectRoleForHire} />

        {/* 4. Jobs Available in Pakistan (Salary Benchmarks + WhatsApp Apply) */}
        <JobsSection onNavigateToJobSeeker={() => scrollToSection('job-seekers')} />

        {/* 5. Hire Staff (Client Requirement Form) */}
        <HireStaffForm
          prefilledRole={prefilledHireRole}
          onInquirySubmitted={handleHireInquirySubmitted}
        />

        {/* 6. For Job Seekers (Registration Form) */}
        <JobSeekerForm onJobSeekerRegistered={handleJobSeekerRegistered} />

        {/* 7. About Agency */}
        <AboutSection />

        {/* 8. Recruitment Process (5 Steps) */}
        <RecruitmentProcess onStartHiring={() => scrollToSection('hire-staff')} />

        {/* 9. Why Choose Us */}
        <WhyChooseUs />

        {/* 10. Photo Gallery */}
        <GallerySection />

        {/* 11. Customer Reviews */}
        <ReviewsSection />

        {/* 12. Google Drive Agency Vault */}
        <GoogleDrivePortal
          hireRequests={hireRequests}
          jobSeekers={jobSeekers}
        />

        {/* 13. Contact Us */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenPolicy={(type) => setPolicyModalType(type)}
      />

      {/* Fixed WhatsApp Us & Call Now Floating Buttons */}
      <FloatingActions />

      {/* Quick Hire Modal */}
      <QuickHireModal
        isOpen={quickModalOpen}
        onClose={() => setQuickModalOpen(false)}
        preselectedRole={prefilledHireRole || 'Housemaid'}
        onSaveInquiry={handleHireInquirySubmitted}
      />

      {/* Policy Modals (Privacy Policy, Terms & Conditions, Disclaimer) */}
      <PolicyModals
        type={policyModalType}
        onClose={() => setPolicyModalType(null)}
      />

      {/* Admin / Inquiries Drawer for Agency Management */}
      <AdminDrawer
        isOpen={adminDrawerOpen}
        onClose={() => setAdminDrawerOpen(false)}
        hireRequests={hireRequests}
        jobSeekers={jobSeekers}
        onClearData={handleClearAdminData}
        onOpenDrive={() => scrollToSection('google-drive')}
      />

      {/* Agency Inquiries Quick Toggle Badge (Bottom Left) */}
      <div className="fixed bottom-5 start-4 z-30">
        <button
          onClick={() => setAdminDrawerOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-slate-700 bg-white/90 hover:bg-white border border-slate-300 rounded-full shadow-xs hover:shadow-sm transition-all cursor-pointer backdrop-blur-xs"
          title="Open Inquiries Desk"
        >
          <Database className="w-3.5 h-3.5 text-emerald-700" />
          <span>
            {isUrdu
              ? `انکوائریز ڈیسک (${hireRequests.length + jobSeekers.length})`
              : `Inquiries Desk (${hireRequests.length + jobSeekers.length})`}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <TemplateProvider>
      <AppContent />
    </TemplateProvider>
  );
}
