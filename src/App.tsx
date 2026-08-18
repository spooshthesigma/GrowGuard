import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PrivacyBannerModal } from './components/PrivacyBannerModal';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { ResearchPage } from './pages/ResearchPage';
import { PrototypePage } from './pages/PrototypePage';
import { AiTechnologyPage } from './pages/AiTechnologyPage';
import { SafetyLabPage } from './pages/SafetyLabPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [privacyModalOpen, setPrivacyModalOpen] = useState<boolean>(false);

  // Sync with window hash for seamless back/forward browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'product', 'research', 'prototype', 'ai', 'safety', 'about'].includes(hash)) {
        setCurrentPage(hash as PageId);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Persistent Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
      />

      {/* Main Page Content Router */}
      <main className="flex-1 w-full overflow-hidden">
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'product' && <ProductPage onNavigate={navigateTo} />}
        {currentPage === 'research' && <ResearchPage onNavigate={navigateTo} />}
        {currentPage === 'prototype' && <PrototypePage onNavigate={navigateTo} />}
        {currentPage === 'ai' && <AiTechnologyPage onNavigate={navigateTo} />}
        {currentPage === 'safety' && <SafetyLabPage onNavigate={navigateTo} />}
        {currentPage === 'about' && (
          <AboutPage 
            onNavigate={navigateTo} 
            onOpenPrivacyModal={() => setPrivacyModalOpen(true)} 
          />
        )}
      </main>

      {/* Persistent Compact Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
      />

      {/* Privacy & Ethics Manifesto Modal */}
      <PrivacyBannerModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
}
