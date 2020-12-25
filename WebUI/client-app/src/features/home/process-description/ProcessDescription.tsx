import React from 'react';
import { FaCalendarAlt, FaHandScissors, FaSearch } from 'react-icons/fa';
import { S } from './ProcessDescription.style';

const ProcessDescription = () => {
  return (
    <S.ProcessDescription>
      <S.Card>
        <FaSearch />
        <h2>Pronađi</h2>
        <p>
          Potrebno Vam je šišanje? Pronađite Vaš omiljeni frizerski salon ili
          pretražite salone koji su u Vašoj blizini
        </p>
      </S.Card>
      <S.Card>
        <FaCalendarAlt />
        <h2>Rezerviši</h2>
        <p>
          Proverite slobodne termine u izabranom frizerskom salonu i rezervišite
          svoj termin uz dva klika
        </p>
      </S.Card>
      <S.Card>
        <FaHandScissors />
        <h2>Šišaj se</h2>
        <p>
          Dođite na vreme i ošišajte se. Ukoliko ste sprečeni da dođete otkažite
          termin bar 24h ranije
        </p>
      </S.Card>
    </S.ProcessDescription>
  );
};

export default ProcessDescription;
