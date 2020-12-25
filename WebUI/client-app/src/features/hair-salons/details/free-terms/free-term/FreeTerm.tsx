import React from 'react';
import { ITerm } from '../../../../../app/models/reservation';
import { S } from './FreeTerm.style';

interface IProps {
  term: ITerm;
}

const FreeTerm: React.FC<IProps> = ({ term }) => {
  return (
    <S.FreeTerm
      type='submit'
      status={term.status}
      disabled={term!.status === 'free' ? false : true}
    >
      <h6>{term!.startTime.slice(0, -3)}</h6>
      <div>
        {term!.status} <span></span>
      </div>
    </S.FreeTerm>
  );
};

export default FreeTerm;
