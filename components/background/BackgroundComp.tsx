'use client';

import CardBalance from '@/features/transactions/components/CardBalance';
import { usePathname } from 'next/navigation';
import ProfileImage from '../imageReusable/ProfileImage';

interface BackgroundCompParams {
  profiles?: Profiles;
}
const BackgroundComp = ({ profiles }: BackgroundCompParams) => {
  const pathname = usePathname();
  // console.log('pathname', pathname);
  return (
    <div className="relative flex justify-center items-center w-full h-[300px] bg-main text-background overflow-hidden ">
      <svg className="absolute bottom-0 left-0 w-full h-[100px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,0 C480,160 960,160 1440,0 L1440,320 L0,320 Z" />
      </svg>

      {/* profiles */}
      {profiles?.avatar_url && pathname === '/profile' && (
        <div className="absolute flex items-center justify-center h-28 w-28 rounded-full bottom-3 ">
          <ProfileImage src={profiles.avatar_url} alt="profile" />
        </div>
      )}

      {/* transactions */}
      {pathname === '/transaction' && (
        <div className="absolute flex items-center justify-center bottom-3 bg-main shadow-foreground shadow-lg rounded-xl">
          <CardBalance />
        </div>
      )}
    </div>
  );
};

export default BackgroundComp;
