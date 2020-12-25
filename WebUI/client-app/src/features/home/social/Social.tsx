import React from 'react';
import { S } from './Social.style';
import { FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';

const Social = () => {
  return (
    <S.Social className='fullWidth'>
      <div className='appContainer social'>
        <a href='https://facebook.com' target='_blank'>
          <FaFacebookSquare size='60px' />
        </a>
        <a href='https://instagram.com' target='_blank'>
          <FaInstagram size='60px' />
        </a>
        <a href='https://twitter.com/' target='_blank'>
          <FaTwitter size='60px' />
        </a>
      </div>
    </S.Social>
  );
};

export default Social;
