import BackgroundComp from '@/components/background/BackgroundComp';
import ProfileComp from '@/features/profiles/components/ProfileComp';
import { createClient } from '@/lib/supabase/server';

const page = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log('user?', user);

  const { data: profilesData, error: errorProfile } = await supabase.from('profiles').select('*').eq('id', user?.id);
  console.log('profiles?', profilesData);
  console.log('errorProfile?', errorProfile);

  if (!profilesData) {
    return null;
  }

  const profiles = profilesData[0];

  return (
    <div>
      <BackgroundComp profiles={profiles} />
      <ProfileComp profiles={profiles} />
    </div>
  );
};

export default page;
