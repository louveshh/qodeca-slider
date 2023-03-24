# Getting Started with Create React App
Project need a clean up, reorganize files structure (for example blackbars component should be in Sandbox -> to be done in future)
## Available Scripts

To run npm run start


## Available Settings
To change settings
# In file App.tsx
<Carousel
  ref={carousel}
  width={width}
  style={carouselStyle}
  count={4} - here we can change amount of slider in our slider
  margin={15} - here we can change margin
>

# In File Slider.tsx & style.css
Blackbars (not finished clean up, so have to be done in multiple places)
For this example 20%
const percentage = 0.2 - percentage of black bars
+ we have to change 
  .my-overlay::before{
  width: 20%;
}
.my-overlay::after{
  left:80%;  - (this is 100% - 20%)
  width: 20%;
}