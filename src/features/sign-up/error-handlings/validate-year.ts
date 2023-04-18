import validator from 'validator';

export const validateYear = (year: string) => {
  const isEmpty = validator.isEmpty(year, { ignore_whitespace: true });
  const isLength = validator.isLength(year, { min: 4, max: 4 });

  return !isEmpty && isLength;
};
