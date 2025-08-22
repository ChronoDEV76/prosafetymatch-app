import React from 'react';
import HeroSection from "./HeroSection";
import FilterBar from "./FilterBar";
import USPList from "./USPList";
import HowItWorks from "./HowItWorks";
import MatchCardGrid from "./MatchCardGrid";
import SignupCTA from "./SignupCTA";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Zet hier je logo-image als je die hebt */}
            <div className="h-8 w-8 rounded bg-brand" />
            <span className="font-semibold">ProSafetyMatch (Dev)</span>
          </div>
          <nav className="hidden sm:flex gap-6 text-sm">
            <a href="#aanbod" className="hover:text-brand">Aanbod</a>
            <a href="#hoe-werkt-het" className="hover:text-brand">Hoe werkt het</a>
          </nav>
        </div>
      </header>

      <HeroSection />
      <FilterBar />
      <USPList />
      <HowItWorks />
      <MatchCardGrid />
      <SignupCTA />
      <Footer />
    </>
  );
}
