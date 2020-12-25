import React from 'react';
import { IHairSalon } from '../../../../app/models/hairSalon';
import { Style } from '../../../../style';
import { S } from './Information.style';

interface IProps {
  hairSalon: IHairSalon;
}

const Information: React.FC<IProps> = ({ hairSalon }) => {
  return (
    <S.Information>
      <Style.HairSalonDetailsCard>
        <div className='header'>
          <h3>Informacije</h3>
        </div>
        <div className='body'>
          <div>Adresa: {hairSalon.address}</div>
          <div>Email: {hairSalon.email}</div>
          <div>Telefon: {hairSalon.phone}</div>
        </div>
      </Style.HairSalonDetailsCard>
    </S.Information>
  );
};

export default Information;
