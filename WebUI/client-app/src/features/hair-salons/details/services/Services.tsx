import { observer } from 'mobx-react-lite';
import React from 'react';
import { IHairSalon } from '../../../../app/models/hairSalon';
import { Style } from '../../../../style';
import { S } from './Services.style';

interface IProps {
  hairSalon: IHairSalon;
}

const Services: React.FC<IProps> = ({ hairSalon }) => {
  return (
    <S.Services>
      <Style.HairSalonDetailsCard>
        <div className='header'>
          <h3>Usluge</h3>
        </div>
        <div className='body'>
          {hairSalon.services.length > 0 ? (
            <S.Content>
              <S.Left>
                {hairSalon.services.map((service) => (
                  <div key={service.id}>{service.name}</div>
                ))}
              </S.Left>
              <S.Right>
                {hairSalon.services.map((service) => (
                  <div key={service.id}>{service.price} RSD</div>
                ))}
              </S.Right>
            </S.Content>
          ) : (
            <div>Trenutno nema informacija o uslugama</div>
          )}
        </div>
      </Style.HairSalonDetailsCard>
    </S.Services>
  );
};

export default observer(Services);
