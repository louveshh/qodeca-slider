# Slider for qodeca, based on other sliders from the internet, and my custom changes
Project need a clean up, reorganize files structure etc. <br />
(for example blackbars component should be in Sandbox -> to be done in future)
## Available Scripts
To run npm run start
## Available Settings <br />
### In file App.tsx <br />
<Carousel <br />
  ref={carousel} <br />
  width={width} <br />
  style={carouselStyle} <br />
  count={4} - here we can change amount of slider in our slider <br />
  margin={15} - here we can change margin <br />
> <br />

### In File Slider.tsx & style.css
Blackbars (not finished clean up, so have to be done in multiple places) <br />
For this example 20% <br />
const percentage = 0.2 - percentage of black bars <br />
and we have to change  <br />
  .my-overlay::before{ <br />
  width: 20%; <br />
} <br />
.my-overlay::after{ <br />
  left:80%;  - (this is 100% - 20%) <br />
  width: 20%; <br />
} <br />