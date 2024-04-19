import trad from "../../lang/traduction";
import { AppContext } from "../../contexts/AppContext";
import { useState, useEffect, useRef, useContext } from "react";

function PeriodInputs({
  darkMode,
  initialMin,
  initialMax,
  min,
  max,
  lang,
}: {
  darkMode: boolean;
  initialMin: number;
  initialMax: number;
  min: number;
  max: number;
  lang: string;
}) {
  const { buddyForm, setBuddyForm } = useContext(AppContext);
  const progressRef = useRef(null);
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handleMin = (e) => {
    let value: number;

    if (e.target.value.length === 1) {
      if (e.target.value[0] === "1" || e.target.value[0] === "2") {
        value = Number(e.target.value);
      } else {
        value = 0;
        alert("Please enter a valid year");
      }
    } else if (e.target.value.length === 2) {
      if (
        (e.target.value[0] === "1" && e.target.value[1] === "9") ||
        (e.target.value[0] === "2" && e.target.value[1] === "0")
      ) {
        value = Number(e.target.value);
      } else {
        value = Number(e.target.value.slice(0, 1));
        alert("Please enter a valid year");
      }
    } else if (e.target.value.length === 3) {
      if (
        (e.target.value[0] === "1" &&
          e.target.value[1] === "9" &&
          Number(e.target.value[2]) >= 5) ||
        (e.target.value[0] === "2" &&
          e.target.value[1] === "0" &&
          Number(e.target.value[2]) <=
            Number(new Date().getFullYear().toString()[2]))
      ) {
        value = Number(e.target.value);
      } else {
        value = Number(e.target.value.slice(0, 2));
        alert("Please enter a valid year");
      }
    } else if (e.target.value.length === 4) {
      if (
        e.target.value[0] === "2" &&
        e.target.value[1] === "0" &&
        e.target.value[2] === "2" &&
        Number(e.target.value[3]) >
          Number(new Date().getFullYear().toString()[3])
      ) {
        value = Number(e.target.value.slice(0, 3));
        alert("Please enter a valid year");
      } else {
        value = Number(e.target.value);
      }
    }

    //value = Math.min(Number(e.target.value), maxValue - 1);

    setMinValue(value);
    setBuddyForm({
      ...buddyForm,
      period: { ...buddyForm.period, start: `${value}-01-01` },
    });
  };

  const handleMax = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
    setBuddyForm({
      ...buddyForm,
      period: { ...buddyForm.period, end: `${value}-12-31` },
    });
  };

  useEffect(() => {
    if (progressRef.current) {
      const diff = max - min;
      progressRef.current.style.left = `${((minValue - min) / diff) * 100}%`;
      progressRef.current.style.width = `${
        ((maxValue - minValue) / diff) * 100
      }%`;
    }
  }, [minValue, maxValue, min, max]);

  return (
    <div className="rounded-md p-4">
      <div
        className={`flex items-center gap-5 ${
          darkMode ? "text-gray-300" : "text-smokyBlack"
        }`}
      >
        <span>{trad[lang].bingeBuddy.between}</span>

        <input
          type="number"
          value={minValue}
          min={min}
          max={max}
          onChange={handleMin}
          className={`rounded-md border text-center focus:ring-0 ${
            darkMode
              ? "bg-darkBg text-gray-300 focus:border-gray-300"
              : "bg-myWhite text-smokyBlack focus:border-gray-700"
          }`}
        />

        <span>{trad[lang].bingeBuddy.and}</span>

        <input
          type="number"
          value={maxValue}
          min={min}
          max={max}
          onChange={handleMax}
          className={`rounded-md border text-center focus:ring-0 ${
            darkMode
              ? "bg-darkBg text-gray-300 focus:border-gray-300"
              : "bg-myWhite text-smokyBlack focus:border-gray-700"
          }`}
        />
      </div>
    </div>
  );
}

export default PeriodInputs;
