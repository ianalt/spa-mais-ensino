import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { TextMaskCustomProps } from './types/text-mask-custom-props';

export const PhoneNumberMaskCustom = forwardRef<
  HTMLElement,
  TextMaskCustomProps
>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(00) 0 0000-0000"
      definitions={{
        '#': /[1-9]/,
      }}
      // inputRef={ref}
      onAccept={(value: any) =>
        onChange({ target: { name: props.name, value } })
      }
      overwrite
    />
  );
});
