import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { S } from './InputText.style';

interface IProps extends FieldRenderProps<string, HTMLElement> {
  label?: string;
  block?: boolean;
}

const InputText: React.FC<IProps> = ({
  input,
  placeholder,
  meta: { touched, error },
  label,
  required,
  block,
}) => {
  return (
    <S.FormItem>
      <label>{label}</label>
      <S.InputText
        {...input}
        placeholder={placeholder}
        required={required}
        block={block}
      />
      {error && touched && <S.Error>{error}</S.Error>}
    </S.FormItem>
  );
};

export default InputText;
