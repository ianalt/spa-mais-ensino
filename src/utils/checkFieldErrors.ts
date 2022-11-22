export interface FieldErrors {
  field: string;
  index?: number | null;
  message: string;
}

export const checkFieldErrors = (
  errors: FieldErrors[],
  field: string,
  index: number | null = null
) => {
  const error = errors.find(
    (error) => error.field === field && error.index === index
  );

  return error?.message || "";
};
