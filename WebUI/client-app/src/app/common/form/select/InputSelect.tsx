import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { S } from './InputSelect.style';

interface IProps extends FieldRenderProps<string, HTMLElement> {
  label?: string;
  block?: boolean;
  disabled?: boolean;
  empty?: boolean;
}

const InputSelect: React.FC<IProps> = ({
  input,
  width,
  label,
  block,
  children,
  required,
  disabled,
  meta: { touched, error },
}) => {
  return (
    <S.FormItem>
      <label>{label}</label>
      <S.InputSelect
        {...input}
        block={block}
        width={width}
        required={required}
        disabled={disabled}
      >
        <option value='' disabled hidden></option>
        {children}
      </S.InputSelect>
      {error && touched && <S.Error>{error}</S.Error>}
    </S.FormItem>
  );
};

export default InputSelect;
