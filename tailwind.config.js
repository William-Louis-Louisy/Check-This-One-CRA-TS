module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F58426",
        secondary: "#006BB6",
        myWhite: "#FAFDFF",
        myBlack: "#000C14",
        myGray: "#A2B2BE",
        myLightGray: "#F0F2F4",
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
