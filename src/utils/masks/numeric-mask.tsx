import { forwardRef } from 'react';
import { NumericFormatProps, NumericFormat } from 'react-number-format';
import { NumericCustomProps } from './types/numeric-custom-props';

export const NumericFormatCustom = forwardRef<
  NumericFormatProps,
  NumericCustomProps
>(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="R$"
    />
  );
});
