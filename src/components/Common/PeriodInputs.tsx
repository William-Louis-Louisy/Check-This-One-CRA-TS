import trad from "../../lang/traduction";
import { AppContext } from "../../contexts/AppContext";
import { useState, useEffect, useContext } from "react";
import YearSelect from "../BingeBuddy/YearSelect";

function PeriodInputs({ lang, darkMode }: { lang: string; darkMode: boolean }) {
  const currentYear = new Date().getFullYear();
  const { setBuddyForm } = useContext(AppContext);

  const [minValue, setMinValue] = useState(1950);
  const [maxValue, setMaxValue] = useState(currentYear);

  const validateYear = (year: number) => {
    return Math.max(1950, Math.min(currentYear, year));
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = validateYear(parseInt(e.target.value));
    if (value < maxValue) {
      setMinValue(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = validateYear(parseInt(e.target.value));
    if (value > minValue) {
      setMaxValue(value);
    }
  };

  useEffect(() => {
    const start = `${minValue}-01-01`;
    const end = `${maxValue}-12-31`;
    setBuddyForm((previous) => {
      if (previous.period.start === start && previous.period.end === end) {
        return previous;
      }
      return { ...previous, period: { start, end } };
    });
  }, [minValue, maxValue, setBuddyForm]);

  return (
    <div
      className={`flex items-center gap-2 rounded-md p-4 ${
        darkMode ? "text-gray-300" : "text-smokyBlack"
      }`}
    >
      <span>{trad[lang].bingeBuddy.between}</span>
      <YearSelect
        darkMode={darkMode}
        value={minValue}
        onChange={handleMinChange}
        min={1950}
        max={maxValue}
      />
      <span>{trad[lang].bingeBuddy.and}</span>
      <YearSelect
        darkMode={darkMode}
        value={maxValue}
        onChange={handleMaxChange}
        min={minValue}
        max={currentYear}
      />
    </div>
  );
}

export default PeriodInputs;
