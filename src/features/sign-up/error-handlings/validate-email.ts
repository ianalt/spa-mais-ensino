import validator from 'validator';

export const validateEmail = (email: string) => {
  const isEmail = validator.isEmail(email);
  const isEmpty = validator.isEmpty(email, { ignore_whitespace: true });

  return isEmail && !isEmpty;
};
