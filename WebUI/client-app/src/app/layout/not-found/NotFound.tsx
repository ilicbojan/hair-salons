import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/button/Button';
import { S } from './NotFound.styled';

const NotFound = () => {
  return (
    <S.NotFound>
      <div className='code'>404</div>
      <div className='message'>Stranica nije pronadjena</div>
      <div className='desc'>
        Ups! Ne mozemo da nadjemo stranicu koju trazite
      </div>
      <Link to='/'>
        <Button type='button' color='primary'>
          Vrati se na pocetnu
        </Button>
      </Link>
    </S.NotFound>
  );
};

export default NotFound;
