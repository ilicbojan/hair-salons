import styled from 'styled-components';

const HeaderContainer = styled.div`
  padding: 20px 25px;
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  border-radius: 0.375rem;
  margin-bottom: 30px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
`;

const ContentContainer = styled.div`
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  border-radius: 0.375rem;
  margin-bottom: 30px;
`;

const InnerContainer = styled.div`
  padding: 15px;
  background-color: #001529;
  border-radius: 0.375rem;
  margin-bottom: 15px;
  color: #fff;
`;

export const S = {
  HeaderContainer,
  ContentContainer,
  InnerContainer,
};
