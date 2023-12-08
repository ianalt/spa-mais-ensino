export const convertBirthDate = (date: string) => {
  const dateParts = date.includes('/') ? date.split('/') : date.split('-');

  const convertedBirthDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

  return convertedBirthDate;
};
