export const convertBirthDate = (date: string) => {
  const dateParts = date.split('/');

  const convertedBirthDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

  return convertedBirthDate;
};
