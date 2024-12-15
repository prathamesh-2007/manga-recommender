import React, { useState } from 'react';
import { TopSection } from './components/TopSection';
import { BottomSection } from './components/BottomSection';
import { MobileMenu } from './components/MobileMenu';
import { FooterBranding } from './sections/FooterBranding';
import { SocialLinks } from './components/SocialLinks';
import { FooterSection } from './types';

export const Footer: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const footerSections: FooterSection[] = [
    {
      title: 'About',
      content: <FooterBranding />
    },
    {
      title: 'Connect',
      content: <SocialLinks />
    }
  ];

  return (
    <footer className="mt-auto bg-gradient-to-b from-black to-zinc-900 border-t border-zinc-800/50">
      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content - Responsive for both mobile and desktop */}
          <div className="py-6 lg:py-8">
            <TopSection />
            <BottomSection />
          </div>

          {/* Mobile Menu */}
          <MobileMenu
            sections={footerSections}
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        </div>
      </div>
    </footer>
  );
};