import { useLineContext } from './LineContext';
import React, { useEffect, useState } from 'react';

const Line: React.FC = () => {
  const { tag1Position, tag2Position } = useLineContext();
  const [lineStyle, setLineStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (tag1Position && tag2Position) {
      const x1 = tag1Position.left + tag1Position.width / 2;
      const y1 = tag1Position.top + tag1Position.height / 2;
      const x2 = tag2Position.left + tag2Position.width / 2;
      const y2 = tag2Position.top + tag2Position.height / 2;

      const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

      setLineStyle({
        width: `${length}px`,
        transform: `rotate(${angle}deg)`,
        top: `${y1}px`,
        left: `${x1}px`,
      });
    }
  }, [tag1Position, tag2Position]);

  return (
    <div
      style={{
        position: 'absolute',
        height: '2px',
        backgroundColor: 'black',
        transformOrigin: '0 0',
        ...lineStyle,
      }}
    />
  );
};

export default Line;
