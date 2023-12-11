
//Variables that track swipe data
let touchstartX = 0;
let touchendX = 0;

//IIFE funktion
(function () {

  //Constructor function
  function Slider(id, mediaQueries) {
    // Get elements from HTML file
    this.slider = document.querySelector(`#${id}`);
    this.sliderList = this.slider.querySelector('.slider-list');
    this.sliderItems = this.slider.querySelectorAll('.slider-item');
    this.sliderNext = this.slider.querySelector('.slider-arrow-next');
    this.sliderPrev = this.slider.querySelector('.slider-arrow-prev');

    // Get media queries
    this.mediaQueryList = [window.matchMedia(`screen and (max-width:${mediaQueries[0] - 1}px)`)]; //Declares array containing media queries for phone (max)
    //window.matchMedia = returnerar en "MediaQueryList" som bl.a. innehåller egenskapen "matches" som är en boolean som returnerar "true" om mediaqueryn matchar "the state of the current window"
    mediaQueries.forEach((mediaQuery) => { //mediaQueries = parameter i constuctor-funktionen, mediaQuery = varje värde, deklaration av parametern för varje query som skickades som argument till huvudfunktionen
      this.mediaQueryList.push(window.matchMedia(`screen and (min-width:${mediaQuery}px)`)); //Adds media queries for tablet and bigger (min)
    });
    //När koden är färdig är mediaQueryList en array med olika media queries

    // Define instance variables
    this.numberOfVisibleItems = null;
    this.currentItemIndex = null;
    this.sliderItemsLength = this.sliderItems.length; //Hur många items som sliden består av
    this.mediaQueryLength = this.mediaQueryList.length; //Hur många media queries som finns

    // Add event listener: to call the run function again when screen resized
    this.mediaQueryList.forEach((mediaQuery) => {
      mediaQuery.addEventListener('change', () => {
        this.run();
      });
    });

    // Add event listener: to go to next slide
    this.sliderNext.addEventListener('click', () => {
      if (this.currentItemIndex < this.sliderItemsLength - this.numberOfVisibleItems) {
        this.currentItemIndex++;
        this.shiftSlides();
      }
      else{ //Goes to the first slide if the last one is reached
        this.currentItemIndex = 0;
        this.shiftSlides();
      }
    });

    // Add event listener: to go to previous slide
    this.sliderPrev.addEventListener('click', () => {
      if (this.currentItemIndex > 0) {
        this.currentItemIndex--;
        this.shiftSlides();
      }
      else{
        this.currentItemIndex = this.sliderItemsLength - this.numberOfVisibleItems
        this.shiftSlides();
      }
    });

    //Add event listener for swipes on slide
    this.slider.addEventListener("touchstart", e => {
      touchstartX = e.changedTouches[0].screenX
      console.log(touchstartX)
    })
    this.slider.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenX
      console.log(touchendX)
      //To avoid accidental swipes when scrolling down the page
      if(touchstartX < touchendX && (touchendX - touchstartX) > 40 ){
        this.swipeSlides()
      }
      else if(touchstartX > touchendX && (touchstartX - touchendX) > 40 ){
        this.swipeSlides()
      }
      else{
        return
      }
    })

    // Disable focus on all slides links
    this.sliderItems.forEach((item) => {
      const elements = item.querySelectorAll('a');
      elements.forEach((element) => {
        element.tabIndex = '-1';
      });
    });
  }

  // Run the slider
  Slider.prototype.run = function () {
    let index = this.mediaQueryLength - 1;
    while (index >= 0) {
      if (this.mediaQueryList[index].matches) {
        // Set number of visible slides
        this.numberOfVisibleItems = index + 1;

        // Reset the slider
        this.currentItemIndex = 0;
        this.sliderList.style.transform = 'translateX(0%)';

        // Set slider list width
        this.sliderList.style.width = `calc(${(100 / this.numberOfVisibleItems) * this.sliderItemsLength}% + ${(this.sliderItemsLength / this.numberOfVisibleItems) * 16}px)`;

        // Set slides width
        this.sliderItems.forEach((item) => {
          item.style.width = `${100 / this.numberOfVisibleItems}%`;
        });

        // Exit the loop
        break;
      }
      index--;
    }
  };

  // A function to shift slides left and right
  Slider.prototype.shiftSlides = function () {
    this.sliderList.style.transform = `translateX(-${(100 / this.sliderItemsLength) * this.currentItemIndex}%)`;
  };

  //Function for making the slides change when swiped
  Slider.prototype.swipeSlides = function () {
    if(touchendX < touchstartX){
      if (this.currentItemIndex < this.sliderItemsLength - this.numberOfVisibleItems) {
        this.currentItemIndex++;
        this.shiftSlides();
      }
      else{ //Goes to the first slide if the last one is reached
        this.currentItemIndex = 0;
        this.shiftSlides();
      }
    }
    else if(touchendX > touchstartX){
      if (this.currentItemIndex > 0) {
        this.currentItemIndex--;
        this.shiftSlides();
      }
      else{
        this.currentItemIndex = this.sliderItemsLength - this.numberOfVisibleItems
        this.shiftSlides();
      }
    }
  };

  /*
  Note about creating slider:
  First parameter is the id of the HTML slider-container element of each slider.
  Second parameter is an array of the media queries (breaking points) where the number of slides increases.
  */

  // Create a new slider and run it
  new Slider('featured-products', [899, 900, 1200, 1800]).run();
})();
