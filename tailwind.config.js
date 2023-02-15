module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F58426",
        secondary: "#006BB6",
        smokyBlack: "#1E120B",
        accentBg: "#FBFBFB",
        myWhite: "#FAFDFF",
        myBlack: "#000C14",
        myGray: "#A2B2BE",
        myLightGray: "#F0F2F4",

        // Dark Mode
        darkBg: "#202225",
        darkSec: "#292b2f",
        darkTert: "#2f3136",
        darkQuar: "#40444b",
        darkQuin: "#40444b",
        altSecondary: "#77C6FF",
        altRed: "#dc2626",
      },
      backgroundImage: {
        background: "url('/src/assets/cto-background.jpg')",
        french: "url('/src/assets/french.png')",
        english: "url('/src/assets/english.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
