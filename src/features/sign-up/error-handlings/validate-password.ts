import validator from 'validator';

export const validatePassword = (password: string) => {
  const isEmpty = validator.isEmpty(password, { ignore_whitespace: true });
  const isLength = validator.isLength(password, { min: 8, max: 16 });
  const isStrongPassword = validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });

  return !isEmpty && isLength && isStrongPassword;
};
