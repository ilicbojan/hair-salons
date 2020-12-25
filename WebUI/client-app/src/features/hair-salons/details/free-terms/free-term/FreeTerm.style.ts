import styled from 'styled-components';
import { COLOR, utilities } from '../../../../../variables';

interface ITermProps {
  status: string;
}

const FreeTerm = styled.button<ITermProps>`
  font-family: 'Montserrat', 'Lato', sans-serif;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.7;
  border-radius: ${utilities.borderRadius};
  box-shadow: ${utilities.shadow};
  display: block;
  flex: 0 0 78px;
  width: 78px;
  height: 65px;
  padding: 5px;
  margin: 5px;
  text-align: center;
  appearance: none;
  cursor: pointer;

  background-color: ${(props: ITermProps) =>
    props.status === 'free' && `${COLOR.termGreen}`};
  background-color: ${(props: ITermProps) =>
    props.status === 'pending' && `${COLOR.termYellow}`};
  background-color: ${(props: ITermProps) =>
    props.status === 'accepted' && `${COLOR.termRed}`};
  background-color: ${(props: ITermProps) =>
    props.status === 'empty' && `${COLOR.grayLight}`};

  &:disabled {
    color: ${COLOR.black};
  }

  & h6 {
    font-size: 1.6rem;
  }

  & span {
    font-size: 1rem;
  }
`;

export const S = {
  FreeTerm,
};
