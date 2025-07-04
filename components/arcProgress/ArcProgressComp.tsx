// import ProgressBar from 'react-customizable-progressbar';
import ProgressBar from 'react-customizable-progressbar';

const ArcProgressComp = ({ percentage }: { percentage: number }) => {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <ProgressBar
        radius={70}
        progress={percentage}
        strokeWidth={18}
        strokeColor={percentage > 80 ? '#dc2626' : '#58d68d'}
        trackStrokeWidth={17}
        trackStrokeColor="#e5e7eb"
        cut={120} // 120° = setengah lingkaran
        rotate={-210} // posisi awal (supaya center)
        pointerRadius={0}
        initialAnimation
        transition="1.5s ease 0s"
      >
        <div className="absolute w-full text-center text-md font-medium text-white" style={{ top: '60%' }}>
          {percentage}%
        </div>
      </ProgressBar>
    </div>
  );
};

export default ArcProgressComp;
