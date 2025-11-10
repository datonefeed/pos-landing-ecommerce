import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { PricingSection } from "@/components/pricing-section";
import { ProductShowcase } from "@/components/product-showcase";
import { SupportSection } from "@/components/support-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { NewsSection } from "@/components/news-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PageLoader } from "@/components/page-loader";

export default function Home() {
  return (
    <PageLoader>
      <main className="min-h-screen">
        <Header />
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <ProductShowcase />
        <SupportSection />
        <TestimonialsSection />
        <NewsSection />
        <Footer />
      </main>
    </PageLoader>
  );
}
