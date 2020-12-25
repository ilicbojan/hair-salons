import React from 'react';
import { AxiosResponse } from 'axios';
import { S } from './ErrorMessage.style';

interface IProps {
  error?: AxiosResponse;
  text?: string | null;
}

const ErrorMessage: React.FC<IProps> = ({ error, text }) => {
  return (
    <div>
      {/* <div>{error.statusText}</div> */}
      {error && error.data && Object.keys(error.data).length > 0 && (
        <div>
          {Object.values(error.data)
            .flat()
            .map((err: any, i) => (
              <S.ErrorMessage key={i}>{err}</S.ErrorMessage>
            ))}
        </div>
      )}
      <S.ErrorMessage>{text}</S.ErrorMessage>
    </div>
  );
};

export default ErrorMessage;
