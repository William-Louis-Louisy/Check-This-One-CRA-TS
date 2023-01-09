import React from "react";

function Slider({
  content,
  sliderId,
  leftButton,
  rightButton,
  leftStepValue,
  rightStepValue,
}: {
  content: any;
  sliderId: string;
  leftButton: any;
  rightButton: any;
  leftStepValue: number;
  rightStepValue: number;
}) {
  //FUNCTION TO SLIDE TO THE LEFT
  const slideToLeft = () => {
    const slider = document.getElementById(`slider-${sliderId}`);
    slider.scrollLeft = slider.scrollLeft - leftStepValue;
  };
  //FUNCTION TO SLIDE TO THE RIGHT
  const slideToRight = () => {
    const slider = document.getElementById(`slider-${sliderId}`);
    slider.scrollLeft = slider.scrollLeft + rightStepValue;
  };

  return (
    <div id="wrapper" className="wrapper">
      <div id="leftBtn" className="leftBtn" onClick={slideToLeft}>
        {leftButton}
      </div>

      <div id={`slider-${sliderId}`} className="slider">
        {content}
      </div>

      <div id="rightBtn" className="rightBtn" onClick={slideToRight}>
        {rightButton}
      </div>
    </div>
  );
}

export default Slider;
