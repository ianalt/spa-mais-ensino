import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { NumericFormatProps, NumericFormat } from 'react-number-format';

interface NumericCustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

interface TextMaskCustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const CpfMaskCustom = forwardRef<HTMLElement, TextMaskCustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000.000.000-00"
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
  }
);

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

export const YearMaskCustom = forwardRef<HTMLElement, TextMaskCustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="0000"
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
  }
);

export const CepMaskCustom = forwardRef<HTMLElement, TextMaskCustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00000-000"
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
  }
);

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
