import React, { useState, useRef, useEffect } from 'react';
import { S } from './HairSalonCard.style';
import { IHairSalon } from '../../../app/models/hairSalon';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface IProps {
  hairSalon: IHairSalon;
}

const HairSalonCard: React.FC<IProps> = ({ hairSalon }) => {
  const [width, setWidth] = useState(1);

  const resizeRef = useRef<any>();
  const cardRef = useRef<any>();

  useEffect(() => {
    setWidth(cardRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    resizeRef.current = handleResize;
  });

  useEffect(() => {
    const resize = () => {
      resizeRef.current();
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleResize = () => {
    setWidth(cardRef.current.offsetWidth);
  };

  return (
    <Link to={`/salons/${hairSalon.id}`}>
      <S.HairSalonCard height={width / 1.42857} ref={cardRef}>
        <S.Image image={hairSalon.image?.url}>
          <div>
            <S.Heading>{hairSalon.name}</S.Heading>
            <S.SubHeading>
              <S.Sport>{hairSalon.city.name}</S.Sport>
            </S.SubHeading>
          </div>
          <div>
            <S.Info>
              <div>{hairSalon.address}</div>
              <div>{hairSalon.phone}</div>
            </S.Info>
          </div>
        </S.Image>
      </S.HairSalonCard>
    </Link>
  );
};

export default observer(HairSalonCard);
