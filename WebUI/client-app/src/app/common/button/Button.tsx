import React, { MouseEvent } from 'react';
import { S } from './Button.style';

interface IButtonProps {
  children?: React.ReactNode;
  props?: any;
  type?: any;
  disabled?: boolean;
  block?: boolean;
  loading?: boolean;
  name?: any;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
  color?: string;
  className?: string;
}

const Button: React.FC<IButtonProps> = ({
  children,
  onClick = () => {},
  type,
  block,
  disabled,
  loading,
  name,
  color,
  className,
  ...props
}) => {
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick(e);
  };
  return (
    <S.Button
      onClick={handleOnClick}
      block={block}
      {...props}
      type={type}
      disabled={loading || disabled}
      name={name}
      color={color}
      className={className}
    >
      {loading && <S.Spinner />}
      {children}
    </S.Button>
  );
};

export default Button;
