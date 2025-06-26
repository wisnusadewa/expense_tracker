import PriorityImage from './base/PriorityImage';

const ProfileImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="relative w-full h-full rounded-full">
      <PriorityImage alt={alt} src={src} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />;
    </div>
  );
};

export default ProfileImage;
