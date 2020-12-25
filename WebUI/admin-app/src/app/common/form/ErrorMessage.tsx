import React from 'react';
import { AxiosResponse } from 'axios';
import { Alert } from 'antd';

interface IProps {
  error: AxiosResponse;
}

const ErrorMessage: React.FC<IProps> = ({ error }) => {
  return (
    <div>
      {error.data && Object.keys(error.data).length > 0 && (
        <div>
          {Object.values(error.data)
            .flat()
            .map((err, i) => (
              <Alert key={i} message={err} type='error' showIcon />
            ))}
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
