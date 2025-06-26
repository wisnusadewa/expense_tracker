import HeroImage from '@/components/imageReusable/HeroImage';

const HeroComp = () => {
  return (
    <div className="flex justify-center items-center">
      <HeroImage src="/home/ManCover.webp" alt="man" />
    </div>
  );
};

export default HeroComp;
