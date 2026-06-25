"use client";

import CategoriesSection from "./Components/CategoriesSection";
import HeroSection from "./Components/HeroSection";
import TopRatedSection from "./Components/TopRatedSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <TopRatedSection />
    </>
  );
}