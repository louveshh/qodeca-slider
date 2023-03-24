import React, { Ref } from 'react';

import { MotionStyle, MotionValue, motion, useMotionTemplate, useTransform } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  childrenCount: number;
  index: number;
  margin: number;
  startIndex: MotionValue<number>;
  itemRef:Ref<HTMLDivElement> | undefined;
}

export function ItemWrapper({
  children,
  childrenCount,
  index,
  margin,
  startIndex,
  itemRef
}: Props): JSX.Element {
  const pos = useTransform(
    startIndex,
    (value) => (value <= index ? -value : childrenCount - value) * 100 -200,
  );
  const transform = useMotionTemplate`translateX(${pos}%)`;

  const style: MotionStyle = {
    boxSizing: 'border-box',
    flex: 1,
    transform,
    willChange: 'transform',
    paddingRight: margin,
  };

  return <motion.div ref={itemRef} style={style}>{children}</motion.div>;
}
