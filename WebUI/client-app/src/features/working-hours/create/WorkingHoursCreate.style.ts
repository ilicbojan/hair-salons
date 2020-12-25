import styled from 'styled-components';
import { MOBILE_FIRST } from '../../../variables';

const WorkingHoursCreate = styled.div`
  padding: 15px;

  @media ${MOBILE_FIRST.lg} {
    width: 60%;
    margin: 0 auto;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;

  & .first-day {
    margin: 0;
  }
`;

const Day = styled.div`
  margin-top: 23px;
  flex: 0 0 10%;
`;

const ContentItem = styled.div`
  flex: 0 0 40%;
`;

export const S = {
  WorkingHoursCreate,
  Content,
  ContentItem,
  Day,
};
