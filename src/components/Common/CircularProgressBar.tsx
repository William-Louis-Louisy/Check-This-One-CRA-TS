import { useEffect, useState } from "react";

function CircularProgressBar({
  progress,
  size = 100,
  strokeWidth = 10,
  darkMode,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  darkMode?: boolean;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference || 0;

  // STATE TO CONTROL THE ANIMATION
  const [initialRender, setInitialRender] = useState(true);

  // Mettez à jour l'état après le montage du composant
  useEffect(() => {
    setInitialRender(false);
  }, []);

  return (
    <div className="relative inline-block">
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          className={`fill-transparent ${
            darkMode ? "stroke-darkQuar" : "stroke-myWhite"
          }`}
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`fill-transparent stroke-primary ${
            !initialRender ? "transition-stroke-dashoffset" : ""
          }`}
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: initialRender ? circumference : strokeDashoffset,
          }}
        />
      </svg>
      <div
        className="absolute top-0 left-0 flex items-center justify-center font-bold text-primary"
        style={{ width: size, height: size }}
      >
        {progress}%
      </div>
    </div>
  );
}

export default CircularProgressBar;
