import PriorityImage from '@/components/imageReusable/base/PriorityImage';

const HeroImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    // sm:aspect-[21/9]
    <div className="relative w-full md:w-1/2 h-[55vh] lg:h-[70vh]">
      <PriorityImage src={src} alt={alt} fill className="object-cover lg:object-contain object-center" sizes="(max-width: 768px) 100vw, 50vw" />
    </div>
  );
};

export default HeroImage;
