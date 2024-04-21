import { AppContext } from "../../contexts/AppContext";
import { useState, useContext, useEffect } from "react";

interface IYearSelectProps {
  darkMode: boolean;
  value: number;
  onChange: any;
  min: number;
  max: number;
}

function YearSelect({ darkMode, value, onChange, min, max }: IYearSelectProps) {
  const years = [];
  for (let year = min; year <= max; year++) {
    years.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  return (
    <select
      value={value}
      onChange={onChange}
      className={`block w-full rounded-md border-myGray text-sm shadow-sm focus:border-primary focus:ring-0 ${
        darkMode ? "bg-darkQuin text-gray-300" : "bg-myWhite text-smokyBlack"
      }`}
    >
      {years}
    </select>
  );
}

export default YearSelect;
