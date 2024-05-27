import { useState } from 'react';
import { Box, styled } from '@mui/material';

const FormatedBox = styled(Box)(() => ({
  '.donut-chart': {
    width: '370px',
    height: '370px',
  },
  '.donut-segment': {
    transition: 'stroke-dasharray 0.3s',
    '&:hover': {
      strokeWidth: "10.5"
    },
    '&.active': {
      strokeWidth: "11"
    },
  },
}));

const image = '/src/assets/tobacco.png';

const DonutChart = ({ flavours }) => {
  const radius = 11;
  const circumference = 2 * Math.PI * radius;

  const [activeSegment, setActiveSegment] = useState(null);

  const calculateStrokeDasharray = (percentage) => {
    const dashArray = (percentage / (flavours.length !== 2 ? 105 : 103)) * circumference;
    return `${dashArray} ${circumference - dashArray}`;
  };

  const calculateOffset = (index) => {
    const previousPercentages = flavours
      .slice(0, index)
      .reduce((acc, flavour) => acc + flavour.percentage, 0);
    return (previousPercentages / 100) * circumference;
  };

  const handleSegmentClick = (index) => {
    setActiveSegment(index);
    // Lógica para el click sobre el segmento
    
  };

  return (
    <FormatedBox>
      <svg viewBox="0 0 36 36" className="donut-chart">
        <defs>
          <pattern
            id="pattern"
            patternUnits="userSpaceOnUse"
            width="36"
            height="36"
          >
            <image xlinkHref={image} x="0" y="0" width="50" height="36" />
          </pattern>
        </defs>
        {flavours.map((flavour, index) => (
          <circle
            key={flavour.id}
            className={`donut-segment${activeSegment === index ? ' active' : ''}`}
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            strokeWidth="10"
            stroke={`url(#pattern)`}
            strokeDasharray={calculateStrokeDasharray(flavour.percentage)}
            strokeDashoffset={-calculateOffset(index)}
            onClick={() => handleSegmentClick(index)}
          />
        ))}
      </svg>
    </FormatedBox>
  );
};

export default DonutChart;
