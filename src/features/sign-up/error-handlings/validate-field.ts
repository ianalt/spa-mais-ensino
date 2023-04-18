import validator from 'validator';

export const validateField = (field: string) => {
  const isEmpty = validator.isEmpty(field, { ignore_whitespace: true });

  return !isEmpty;
};
