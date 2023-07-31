import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";


  // Initialize the slider
  let keenslider = new KeenSlider("#shopitem-slides", {
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 10 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 10 },
      },
    },
    slides: {
      perView: 1,
      spacing: 15,
    },
  });