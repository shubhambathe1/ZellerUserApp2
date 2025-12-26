export const capitalizeFirstLetter = (word: string) => {
  if (!word) return '';
  return word.toLocaleLowerCase().charAt(0).toUpperCase() + word.slice(1);
}
