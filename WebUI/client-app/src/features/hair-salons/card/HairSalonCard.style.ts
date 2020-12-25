import styled from 'styled-components';
import { utilities, COLOR, MOBILE_FIRST } from '../../../variables';

interface ICardProps {
  height: any;
}

interface IImageProps {
  image: any;
}

const HairSalonCard = styled.div<ICardProps>`
  width: 100%;
  height: ${(props) => props.height}px;
  border-radius: ${utilities.borderRadius};
  box-shadow: ${utilities.shadow};
  overflow: hidden;

  @media ${MOBILE_FIRST.sm} {
    margin: 0;
  }

  @media ${MOBILE_FIRST.lg} {
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.07);
    }
  }

  & button {
    margin: 0;
    padding: 5px 15px;
    box-shadow: none;

    & svg {
      margin: 0;
      height: 20px;
      width: 20px;
    }
  }
`;

const Image = styled.div<IImageProps>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('${(props) => props.image && props.image}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Heading = styled.div`
  background-color: ${COLOR.primary};
  color: ${COLOR.secondary};
  padding: 5px 15px;
  margin-bottom: 5px;
  font-size: 2rem;
  border-radius: ${utilities.borderRadius};
`;

const SubHeading = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Sport = styled.div`
  background-color: ${COLOR.primary};
  color: ${COLOR.white};
  font-size: 1.2rem;
  text-transform: uppercase;
  padding: 8px 15px;
  margin-right: 5px;
  border-radius: ${utilities.borderRadius};
`;

const Info = styled.div`
  background-color: ${COLOR.secondaryDark};
  color: ${COLOR.white};
  padding: 5px 15px;
  margin-bottom: 5px;
  font-size: 1.6rem;
  border-radius: ${utilities.borderRadius};
`;

export const S = { Image, HairSalonCard, Heading, SubHeading, Sport, Info };
