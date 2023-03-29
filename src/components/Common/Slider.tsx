import { useState, useEffect } from "react";
import { debounce, throttle } from "lodash";

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
  const [stepValue, setStepValue] = useState(leftStepValue);
  const [cardWidth, setCardWidth] = useState(213);
  const cardGap = 24;

  const updateStepValue = () => {
    const cardsPerStep = 3; // Le nombre de ContentCard que vous souhaitez faire défiler

    // Mettez à jour la cardWidth en fonction de la largeur de la fenêtre
    let updatedCardWidth;
    if (window.innerWidth < 768) {
      updatedCardWidth = 106;
    } else {
      updatedCardWidth = 213;
    }
    setCardWidth(updatedCardWidth);

    // Calculez combien de ContentCard peuvent être affichées sur l'écran
    const visibleCards = Math.floor(
      (window.innerWidth + cardGap) / (updatedCardWidth + cardGap)
    );

    // Déterminez combien de ContentCard doivent être défilées à chaque étape
    const cardsToScroll = Math.min(visibleCards, cardsPerStep);

    // Mettez à jour le stepValue
    setStepValue(cardsToScroll * (updatedCardWidth + cardGap));
  };

  useEffect(() => {
    updateStepValue(); // Mettez à jour les stepValues lors du montage du composant

    // Ajoutez un gestionnaire d'événement pour écouter les événements de redimensionnement
    const handleResize = debounce(() => {
      updateStepValue();
    }, 250);

    window.addEventListener("resize", handleResize);

    return () => {
      // Supprimez l'écouteur d'événements lors du démontage du composant
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //FUNCTION TO SLIDE TO THE LEFT
  const slideToLeft = throttle(() => {
    const slider = document.getElementById(`slider-${sliderId}`);
    slider.scrollLeft = slider.scrollLeft - stepValue;
  }, 300);
  //FUNCTION TO SLIDE TO THE RIGHT
  const slideToRight = throttle(() => {
    const slider = document.getElementById(`slider-${sliderId}`);
    slider.scrollLeft = slider.scrollLeft + stepValue;
  }, 300);

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
