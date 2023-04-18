import validator from 'validator';

export const validatePhoneNumber = (phoneNumber: string) => {
  const isEmpty = validator.isEmpty(phoneNumber, { ignore_whitespace: true });
  const isLength = validator.isLength(phoneNumber, { min: 11, max: 11 });

  return !isEmpty && isLength;
};
