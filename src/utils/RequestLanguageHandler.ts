// LANGUAGE HANDLER
export const handleLang = (lang) => {
  switch (lang) {
    case "fr":
      return "fr-FR";
    case "en":
      return "en-US";
    default:
      return "en-US";
  }
};

// ISO 3166-1 HANDLER
export const handleCountry = (lang) => {
  switch (lang) {
    case "fr":
      return "FR";
    case "en":
      return "US";
    default:
      return "US";
  }
};
