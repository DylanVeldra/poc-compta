export const generateFrMonthPreposition = (locale: any, month: string) => {
  if (locale === "fr") {
    const firstLetter = month.split("")[0];
    return firstLetter === "A" ||
      firstLetter === "a" ||
      firstLetter === "o" ||
      firstLetter === "O"
      ? "d'"
      : "de ";
  } else {
    return "";
  }
};