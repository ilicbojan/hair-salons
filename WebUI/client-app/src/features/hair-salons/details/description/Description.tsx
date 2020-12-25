import { observer } from 'mobx-react-lite';
import React from 'react';
import { Style } from '../../../../style';
import { S } from './Description.style';

interface IProps {
  description: string;
}

const Description: React.FC<IProps> = ({ description }) => {
  return (
    <S.Description>
      <Style.HairSalonDetailsCard>
        <div className='header'>
          <h3>Opis</h3>
        </div>
        <div className='body'>
          <p>{description}</p>
        </div>
      </Style.HairSalonDetailsCard>
    </S.Description>
  );
};

export default observer(Description);
