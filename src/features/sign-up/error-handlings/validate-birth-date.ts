import validator from 'validator';

export const validateBirthDate = (birthDate: string) => {
  const isEmpty = validator.isEmpty(birthDate, { ignore_whitespace: true });
  const isLength = validator.isLength(birthDate, { min: 10, max: 10 });
  const isDate = validator.isDate(birthDate);

  return !isEmpty && isLength && isDate;
};
