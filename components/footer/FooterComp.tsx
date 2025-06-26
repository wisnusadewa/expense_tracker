import { ThemeSwitcher } from '../theme-switcher';

const FooterComp = () => {
  return (
    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-2">
      <p>Powered by kong</p>
      <ThemeSwitcher />
    </footer>
  );
};

export default FooterComp;
