import React from 'react';
import { IHairSalon } from '../../../app/models/hairSalon';
import { S } from './ContactInfo.style';

interface IProps {
  hairSalon?: IHairSalon;
}

const ContactInfo: React.FC<IProps> = ({ hairSalon }) => {
  return (
    <S.ContactInfo className='fullWidth'>
      {hairSalon ? (
        <>
          <a href={`mailto: ${hairSalon?.email}`}>{hairSalon?.email}</a>
          <a className='phone' href={`tel: ${hairSalon?.phone}`}>
            {hairSalon?.phone}
          </a>
        </>
      ) : (
        <>
          <a href='mailto: test@test.com'>barber@barber.com</a>
          <a className='phone' href='tel:+381651234567'>
            +381 65 12 34 567
          </a>{' '}
        </>
      )}
    </S.ContactInfo>
  );
};

export default ContactInfo;
