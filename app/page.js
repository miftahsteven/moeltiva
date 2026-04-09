import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollReveal from '@/components/ScrollReveal';
import HeroSection from '@/components/sections/HeroSection';
import ProductShowcase from '@/components/sections/ProductShowcase';
import TrustSection from '@/components/sections/TrustSection';
import IngredientSection from '@/components/sections/IngredientSection';
import BenefitSection from '@/components/sections/BenefitSection';
import ProductDetailSection from '@/components/sections/ProductDetailSection';
import WhereToFind from '@/components/sections/WhereToFind';
import TestimonialSection from '@/components/sections/TestimonialSection';
import CTAFinal from '@/components/sections/CTAFinal';
import UpgradeFAQSection from '@/components/sections/UpgradeFAQSection';

export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Product Showcase */}
        {/* <ProductShowcase /> */}

        {/* 3. Trust / Social Proof Bar */}
        {/* <TrustSection /> */}

        {/* 4. Ingredients */}
        <IngredientSection />

        {/* 5. Benefits */}
        <BenefitSection />

        {/* 6. Product Detail */}
        {/* <ProductDetailSection /> */}
        <ProductShowcase />
        <UpgradeFAQSection />

        {/* 7. Where to Find */}
        <WhereToFind />

        {/* 8. Testimonials */}
        {/* <TestimonialSection /> */}

        {/* 9. Final CTA */}
        {/* <CTAFinal /> */}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp button */}
      <WhatsAppButton />

      {/* Scroll reveal (client-side IntersectionObserver) */}
      <ScrollReveal />
    </>
  );
}
