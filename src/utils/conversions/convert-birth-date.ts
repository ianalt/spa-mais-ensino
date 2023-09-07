export const convertBirthDate = (date: string) => {
  //TODO had to do this due to undefined bug
  const dateParts = date.includes('/') ? date.split('/') : date.split('-');

  const convertedBirthDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

  return convertedBirthDate;
};
