import React from 'react';
import { S } from './Statistics.style';

const Statistics = () => {
  return (
    <S.Statistics>
      <S.Counter>
        <h5>50</h5>
        <div>Fudbalskih terena</div>
      </S.Counter>
      <S.Counter>
        <h5>24</h5>
        <div>Kosarkaskih terena</div>
      </S.Counter>
      <S.Counter>
        <h5>19</h5>
        <div>Teniskih terena</div>
      </S.Counter>
    </S.Statistics>
  );
};

export default Statistics;
