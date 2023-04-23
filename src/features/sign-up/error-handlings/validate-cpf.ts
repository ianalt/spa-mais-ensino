import validator from 'validator';

export const validateCpf = (cpf: string) => {
  const isEmpty = validator.isEmpty(cpf, { ignore_whitespace: true });
  const isLength = validator.isLength(cpf, { min: 11, max: 11 });

  return !isEmpty && isLength;
};
