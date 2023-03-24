import React, { useRef, useState, useEffect } from 'react';
import { Carousel, ICarousel } from './Sandbox';

export function App(): JSX.Element {
  const carousel = useRef<ICarousel>(null);
  const [index, setIndex] = useState(0);

  const carouselStyle = {
    flex: 1,
    height: '100%',
  };

  const itemStyle = {
    width: '100%',
    height: '100%',
  };
  const myRef  = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(()=>{
    if (myRef?.current?.offsetWidth){
      setWidth(myRef?.current?.offsetWidth)
    }
  },[myRef])

  return (
    <div className="app">
      <h1 className="header">Test ŁB</h1>

      <div className="carousel-container">
        <div className="my-overlay" ref={myRef}/>



        <Carousel
          ref={carousel}
          width={width}
          style={carouselStyle}
          count={4}
          margin={15}
          draggable
          
          onChange={(newIndex: number): void => {
            setIndex(newIndex);
          }}
        >
          <div style={{ ...itemStyle, backgroundColor: 'orange' }} >7</div>
          <div style={{ ...itemStyle, backgroundColor: 'yellow' }} >8</div>
          <div style={{ ...itemStyle, backgroundColor: 'green' }} >1</div>
          <div style={{ ...itemStyle, backgroundColor: 'blue' }} >2</div>
          <div style={{ ...itemStyle, backgroundColor: 'indigo' }} >3</div>
          <div style={{ ...itemStyle, backgroundColor: 'violet' }} >4</div>
          <div style={{ ...itemStyle, backgroundColor: 'aqua' }} >5</div>
          <div style={{ ...itemStyle, backgroundColor: 'pink' }} >6</div>
        </Carousel>


      </div>
      <div className='buttons'>
      <button
          className="button"
          type="button"
          onClick={(): void => {
            carousel.current?.slidePrev();
          }}
        >
          {'<'}
        </button>
      <button
          className="button"
          type="button"
          onClick={(): void => {
            carousel.current?.slideNext();
          }}
        >
          {'>'}
        </button>
      </div>


      <div className="index">{index}</div>
    </div>
  )
}