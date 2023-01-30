// CHANGE DATE FORMAT FROM YYYY-MM-DD TO DD-MM-YYYY
export const formatDateUsToFr = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};
