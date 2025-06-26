'use client';

import { useUser } from '@/context/AuthContext';
import Link from 'next/link';

const Cta = () => {
  const user = useUser();
  console.log('user??', user);

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <Link href="/transaction" className="bg-main flex justify-center items-center text-background w-full text-[18px] md:w-[358px] h-[67px] rounded-[40px] shadow-md shadow-foreground ">
        Get Started
      </Link>

      {!user && (
        <div className="flex gap-2">
          <p>Already have account?</p>
          <Link className="text-main_text" href="/auth/login">
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cta;
