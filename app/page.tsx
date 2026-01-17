"use client";
import React from "react";
import { useTheme } from "../context/ThemeContext";

import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import HeroScroll from "../components/HeroScroll";
import FeatureCards from "../components/cards/FeatureCards";
import TrustBuilding from "../components/TrustBuilding";
import Testimonials from "../components/Testimonials";
import PricingCards from "../components/cards/PricingCards";
import Footer from "../components/Footer";

export default function HomePage() {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-50"
      }`}
    >
      <Header />
        <HeroSection />
        <HeroScroll />
        <FeatureCards />
        <TrustBuilding />
        <Testimonials />
        <PricingCards />
      <Footer />
    </div>
  );
}
