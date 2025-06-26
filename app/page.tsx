import FooterComp from '@/components/footer/FooterComp';
import Cta from '@/features/home/components/Cta';
import HeroComp from '@/features/home/components/HeroComp';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-5 items-center">
        {/* <NavbarComp /> */}
        <div className="flex-1 flex flex-col gap-5 w-full ">
          <HeroComp />
          <main className="flex-1 flex flex-col text-center text-2xl lg:text-4xl font-bold text-main_text">
            <h2>Spend Smarter</h2>
            <h2>Save More</h2>
          </main>
          <Cta />
        </div>
        <FooterComp />
      </div>
    </main>
  );
}
