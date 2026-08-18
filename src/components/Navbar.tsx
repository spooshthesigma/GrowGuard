import React, { useState } from 'react';
import { PageId } from '../types';
import { Logo } from './Logo';
import { 
  Menu, 
  X, 
  Sparkles, 
  Layers, 
  BookOpen, 
  Smartphone, 
  Cpu, 
  Info,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenPrivacyModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenPrivacyModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Smartphone },
    { id: 'product', label: 'Product', icon: Layers },
    { id: 'research', label: 'Research', icon: BookOpen },
    { id: 'prototype', label: 'Prototype', icon: Smartphone },
    { id: 'ai', label: 'AI Technology', icon: Cpu },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleLinkClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <button 
          onClick={() => handleLinkClick('home')}
          className="focus:outline-none group text-left transition-transform active:scale-98"
          aria-label="GrowGuard Home"
        >
          <Logo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-50 p-1.5 rounded-full border border-slate-200/70 shadow-xs">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('prototype')}
            className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold tracking-tight shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
          >
            <span>View Prototype</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border border-blue-100'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('prototype')}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Explore Interactive Prototype</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
