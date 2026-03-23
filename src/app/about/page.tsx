import AboutSection from '@/components/AboutSection';
import StatsCounter from '@/components/StatsCounter';

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="bg-[#f2f4f5] py-20 px-6 mt-12 text-center border-b border-black/10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Our Mission</h1>
        <p className="text-xl md:text-2xl text-black/70 max-w-2xl mx-auto">
          We are dedicated to creating a world where every individual has access to fundamental necessities.
        </p>
      </div>
      <AboutSection />
      <StatsCounter />
    </div>
  );
}
