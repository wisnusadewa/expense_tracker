import ProfileImage from '../imageReusable/ProfileImage';

interface BackgroundCompParams {
  profiles?: Profiles;
}
const BackgroundComp = ({ profiles }: BackgroundCompParams) => {
  return (
    <div className="relative flex justify-center items-center w-full h-[300px] bg-main text-background overflow-hidden ">
      <svg className="absolute bottom-0 left-0 w-full h-[100px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,0 C480,160 960,160 1440,0 L1440,320 L0,320 Z" />
      </svg>
      {profiles?.avatar_url && (
        <div className="absolute flex items-center justify-center h-28 w-28 rounded-full bottom-3 ">
          <ProfileImage src={profiles.avatar_url} alt="profile" />
        </div>
      )}
    </div>
  );
};

export default BackgroundComp;
