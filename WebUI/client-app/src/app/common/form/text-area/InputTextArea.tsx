import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { S } from './InputTextArea.style';

interface IProps extends FieldRenderProps<string, HTMLElement> {
  label?: string;
  block: boolean;
}

const InputTextArea: React.FC<IProps> = ({
  input,
  placeholder,
  meta: { touched, error },
  label,
  required,
  block,
  rows,
}) => {
  return (
    <S.FormItem>
      <label>{label}</label>
      <S.InputTextArea
        {...input}
        rows={rows}
        placeholder={placeholder}
        required={required}
        block={block}
      />
      {error && touched && <S.Error>{error}</S.Error>}
    </S.FormItem>
  );
};

export default InputTextArea;
