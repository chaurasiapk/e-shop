import HeroCarousel from "@/components/home/hero-carousel";
import TopCategories from "@/components/home/top-categories";
import SmartPhoneSection from "@/components/home/smart-phone-section";
import LaptopSection from "@/components/home/laptop-section copy";
import TopBrands from "@/components/home/top-brands";
import Accessories from "@/components/home/accessories";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
        <HeroCarousel />
        <SmartPhoneSection />
        <LaptopSection />
        <TopCategories />
        <TopBrands />
        <Accessories />
      </div>
    </main>
  );
}
