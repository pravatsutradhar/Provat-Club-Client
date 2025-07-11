import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import AboutSection from '../components/home/AboutSection';
import LocationSection from '../components/home/LocationSection';
import PromotionSection from '../components/home/PromotionSection';

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />
      <AboutSection />
      <LocationSection />
      <PromotionSection />
      {/* Footer will be added globally in App.jsx */}
    </div>
  );
}

export default HomePage;