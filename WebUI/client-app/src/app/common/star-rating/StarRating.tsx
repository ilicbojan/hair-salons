import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { S } from './StarRating.style';
import { Field } from 'react-final-form';

interface IProps {
  disabled?: boolean;
  initial?: number;
}

const StarRating: React.FC<IProps> = ({ initial, disabled }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <S.StarRating>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        if (disabled && initial) {
          return (
            <label key={index}>
              <input type='radio' name='rating' value={ratingValue} />
              <FaStar
                className='star'
                color={ratingValue <= initial ? '#ffc107' : '#333'}
                size={20}
              />
            </label>
          );
        } else {
          return (
            <label key={index}>
              <Field type='radio' name='rating' value={ratingValue}>
                {({ input }) => {
                  return (
                    <input
                      name={input.name}
                      type='radio'
                      value={ratingValue}
                      checked={input.checked}
                      onChange={input.onChange}
                      onClick={() => setRating(ratingValue)}
                    />
                  );
                }}
              </Field>
              <FaStar
                className='star'
                color={ratingValue <= (hover! || rating!) ? '#ffc107' : '#333'}
                size={30}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        }
      })}
    </S.StarRating>
  );
};

export default StarRating;
