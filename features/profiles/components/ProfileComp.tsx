'use client';

import { Gem, UserCog } from 'lucide-react';
import EditProfiles from './EditProfiles';

interface ProfileCompParams {
  profiles: Profiles;
}

const ProfileComp = ({ profiles }: ProfileCompParams) => {
  // console.log('profiles??:', profiles);

  return (
    <div className="flex flex-col gap-12 justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center h-full font-semibold">
        <p className="text-[20px]">{profiles.full_name ? profiles.full_name : 'no name'}</p>
        <p className="text-main_text text-[16px]">{profiles.email}</p>
      </div>

      <div className="w-full px-6 text-[16px]">
        <div className="flex justify-start items-center gap-2">
          <Gem size={20} />
          <p>Invite Friends</p>
        </div>
        <div className="border-b border-gray-300 my-6" />

        <div className="flex justify-start items-center gap-2">
          <EditProfiles
            textButton="submit"
            titleTriger="Edit Profiles"
            titleHeader="Edit"
            titleTrigerClassName="text-foreground"
            iconButton={<UserCog size={20} />}
            dialogTriggerClassName="px-0 py-1.5 w-full bg-transparent flex items-center rounded-none md:text-[14px] text-[12px] font-medium cursor-pointer gap-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileComp;
