import styled from 'styled-components';
import { COLOR, MOBILE_FIRST, utilities } from '../../../../variables';

interface ITermProps {
  status: string;
}

interface IItemProps {
  color: string;
}

const FreeTerms = styled.div`
  padding: 15px 0 15px 15px;
  position: relative;
  min-height: 646px;
  grid-area: terms;

  @media ${MOBILE_FIRST.lg} {
    padding: 15px;
  }
`;

const Content = styled.div`
  display: flex;
`;

const Legend = styled.div`
  display: flex;
`;

const Item = styled.div<IItemProps>`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  margin: 0 10px 5px 0;

  & .legend {
    padding: 10px;
    margin-right: 5px;
    border-radius: ${utilities.borderRadius};

    background-color: ${(props) => props.color === 'green' && COLOR.termGreen};
    background-color: ${(props) =>
      props.color === 'yellow' && COLOR.termYellow};
    background-color: ${(props) => props.color === 'red' && COLOR.termRed};
  }
`;

const Terms = styled.div`
  overflow-x: auto;
`;

const TermRow = styled.div`
  display: flex;
  margin-left: 5px;
`;

const Term = styled.button<ITermProps>`
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

const Dates = styled.div`
  flex: 0 0 55px;
  background-color: ${COLOR.primary};
  border-radius: ${utilities.borderRadius};
  overflow: hidden;
`;

const Date = styled.div`
  height: 75px;
  padding: 10px 4px 5px 6px;
  /* margin: 6px 4px 6px 0; */
  text-align: center;
  color: ${COLOR.secondary};

  &:first-child {
    background-color: ${COLOR.secondary};
    color: ${COLOR.primary};
    font-weight: bold;
  }
`;

export const S = {
  FreeTerms,
  Content,
  Legend,
  Item,
  Terms,
  TermRow,
  Term,
  Dates,
  Date,
};
