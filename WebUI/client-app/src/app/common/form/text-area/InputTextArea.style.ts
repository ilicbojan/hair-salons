import styled from 'styled-components';
import { utilities, COLOR } from '../../../../variables';

interface IProps {
  block?: boolean;
  width?: any;
}

const InputTextArea = styled.textarea<IProps>`
  font-size: 1.6rem;
  padding: 10px;
  outline: none;
  border: 2px solid ${COLOR.white};
  border-radius: ${utilities.borderRadius};
  box-shadow: ${utilities.shadow};

  width: ${(props: IProps) => (props.block ? '100%' : props.width)};

  &:focus {
    border-color: ${COLOR.primary};
  }
`;

const FormItem = styled.div<IProps>`
  margin: 15px 0 0 0;
  width: ${(props: IProps) => (props.block ? '100%' : props.width)};
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: red;
`;

export const S = {
  InputTextArea,
  FormItem,
  Error,
};
