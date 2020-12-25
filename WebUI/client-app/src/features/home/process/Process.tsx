import React from 'react';
import { S } from './Process.style';
import {
  FaSearch,
  FaCalendarAlt,
  FaHandScissors,
  FaArrowRight,
} from 'react-icons/fa';

const Process = () => {
  return (
    <S.Process className='fullWidth'>
      <div className='appContainer process'>
        <span>
          <FaSearch size='30px' />
        </span>
        <span>
          <FaArrowRight size='20px' />
        </span>
        <span>
          <FaCalendarAlt size='30px' />
        </span>
        <span>
          <FaArrowRight size='20px' />
        </span>
        <span>
          <FaHandScissors size='30px' />
        </span>
      </div>
    </S.Process>
  );
};

export default Process;
