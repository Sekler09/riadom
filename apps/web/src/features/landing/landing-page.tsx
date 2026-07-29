import { CtaSection } from '@/features/landing/components/cta-section';
import { FeaturesSection } from '@/features/landing/components/features-section';
import { Footer } from '@/features/landing/components/footer';
import { HeroSection } from '@/features/landing/components/hero-section';
import { HowItWorksSection } from '@/features/landing/components/how-it-works-section';
import { MarqueeSection } from '@/features/landing/components/marquee-section';
import { Navbar } from '@/features/landing/components/navbar';
import { StoriesSection } from '@/features/landing/components/stories-section';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StoriesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export { LandingPage };
