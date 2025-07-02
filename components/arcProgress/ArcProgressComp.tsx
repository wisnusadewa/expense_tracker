// import ProgressBar from 'react-customizable-progressbar';
import ProgressBar from 'react-customizable-progressbar';

const ArcProgressComp = ({ percentage }: { percentage: number }) => {
  return (
    <div className="relative w-40 h-36 flex items-center justify-center">
      <ProgressBar
        radius={60}
        progress={percentage}
        strokeWidth={13}
        strokeColor={percentage > 80 ? '#dc2626' : '#7d3dd3'}
        trackStrokeWidth={12}
        trackStrokeColor="#e5e7eb"
        cut={120} // 120° = setengah lingkaran
        rotate={-210} // posisi awal (supaya center)
        pointerRadius={0}
        initialAnimation
        transition="1.5s ease 0s"
      >
        <div className="absolute w-full text-center text-sm font-medium" style={{ top: '60%' }}>
          {percentage}%
        </div>
      </ProgressBar>
    </div>
  );
};

export default ArcProgressComp;
