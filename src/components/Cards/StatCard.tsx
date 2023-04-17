import React from "react";

function StatCard({
  data,
  label,
  darkMode,
}: {
  data: number;
  label: string;
  darkMode: boolean;
}) {
  return (
    <div
      className={`flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-md p-2 text-center text-primary shadow-lg ${
        darkMode ? "bg-darkSec" : "bg-myLightGray"
      }`}
    >
      <span className="text-4xl font-bold">{data}</span>
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}

export default StatCard;
