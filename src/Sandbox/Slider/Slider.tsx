import React, { useEffect, useRef, useState } from 'react';

import {
  MotionStyle,
  MotionValue,
  motion,
  useMotionTemplate,
  useTransform,
} from 'framer-motion';

import { ItemWrapper } from './ItemWrapper';

type Props = {
  children?: React.ReactNode;
  count: number;
  index: MotionValue<number>;
  margin: number;
  style?: React.CSSProperties;
  width?: number;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Slider = React.forwardRef<HTMLDivElement, Props>(function Slider(
  { children, style = {}, margin, count, index, width, ...props },
  ref,
): JSX.Element {
  const percentage = 0.2
  const [newX, setNewX] = useState(0);
  const childrenCount = React.Children.count(children);
  const tail = childrenCount - count;
  const frameWidth = 100 / childrenCount;
  const [newIndex, setNewIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const startIndex = useTransform(index, (value) => {
    if (!tail) {
      return 0;
    }

    const indexTemp = ((Math.round(value) % childrenCount) + childrenCount) % childrenCount;
    if (indexTemp !== newIndex) {
      setNewIndex(indexTemp);
    }

    if (value >= 0) {
      return (Math.floor(value / tail) * tail) % childrenCount;
    }

    return (
      (childrenCount + ((Math.ceil(value / tail) * tail - tail) % childrenCount)) % childrenCount
    );
  });

  const translate = useTransform(index, (value) => {
    if (!tail) {
      return 0;
    }
    if (Number.isInteger(value)) {
      const indexTemp = ((Math.round(value) % childrenCount) + childrenCount) % childrenCount;
      if (indexTemp !== newIndex) {
        setNewIndex(indexTemp);
      }
    }
    if (value >= 0) {
      const out = frameWidth * (value % tail);
      return out;
    }
    return frameWidth * (tail + (value % tail));
  });

  const containerStyle = {
    ...style,
    overflow: 'hidden',
    touchAction: 'pan-y',
  };

  const transform = useMotionTemplate`translateX(-${translate}%)`;
  const sliderStyle: MotionStyle = {
    height: '100%',
    position: 'absolute',
    transform,
    willChange: 'transform',
    display: 'flex',
    width: '100%',
  };
  const sliderStyleTwo: MotionStyle = {
    height: '100%',
    position: 'absolute',
    willChange: 'left',
    width: `calc(((100% - ${(count - 1) * margin}px) / ${count} + ${margin}px)*${childrenCount})`,
  };
  const itemRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(itemRef.current){
      setItemWidth(itemRef.current.offsetWidth)
    }
  }, [itemRef])

  useEffect(() => {
    if (width) {
      if (newIndex === 0) {
        setNewX(width * percentage);
        return;
      }
      if (newIndex === childrenCount - 1) {
        setNewX(width * percentage + (width*(1-(2*percentage)) - itemWidth) + margin);
        return;
      }
      setNewX((itemWidth))
    }
  }, [width, newIndex, childrenCount, margin, newX, itemWidth]);

  return (
    <div ref={ref} style={containerStyle} {...props}>
      <motion.div
        style={sliderStyleTwo}
        animate={{
          x: newX,
        }}
        transition={{ duration: 1 }}
      >
        <motion.div
          style={sliderStyle}
          animate={{
            transition: {
              delay: 1,
              duration: 1,
            },
          }}
        >
          {React.Children.map(children, (child, i) => (
            <ItemWrapper
              itemRef={itemRef}
              childrenCount={childrenCount}
              index={i}
              margin={margin}
              startIndex={startIndex}
            >
              {child}
            </ItemWrapper>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
});
