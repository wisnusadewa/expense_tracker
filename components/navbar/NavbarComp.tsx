import { createClient } from '@/lib/supabase/server';
import { hasEnvVars } from '@/lib/utils';
import Link from 'next/link';
import { AuthButton } from '../auth-button';
import { EnvVarWarning } from '../env-var-warning';
import NavbarItems from './NavbarItem';

const NavbarComp = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={'/'}>Expense Tracker</Link>
        </div>

        <div className="hidden md:block">{user && <NavbarItems />}</div>

        {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
      </div>
    </nav>
  );
};

export default NavbarComp;
