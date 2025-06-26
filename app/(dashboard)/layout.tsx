import FooterComp from '@/components/footer/FooterComp';
import NavbarComp from '@/components/navbar/NavbarComp';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full flex flex-1 flex-col items-center">
        <NavbarComp />
        <div className="flex-1 flex flex-col gap-20 w-full">{children}</div>
        <FooterComp />
      </div>
    </main>
  );
}
