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
