import React, { useContext } from 'react';
import { Comment, Avatar, Col, Row, Rate } from 'antd';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { S } from '../../../styles';

const HairSalonReviewsList = () => {
  const rootStore = useContext(RootStoreContext);
  const { hairSalon } = rootStore.hairSalonStore;

  return (
    <Row justify='space-between'>
      {hairSalon?.reviews.map((review) => (
        <Col key={review.user.username} span={11}>
          <S.InnerContainer>
            <Rate disabled value={review.rating} />
            <Comment
              author={
                <Link
                  to={`users/${review.user.username}`}
                  style={{ color: 'white' }}
                >
                  {review.user.username}
                </Link>
              }
              avatar={
                <Avatar
                  src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                  alt={review.user.username}
                />
              }
              content={<p>{review.comment}</p>}
            />
          </S.InnerContainer>
        </Col>
      ))}
    </Row>
  );
};

export default observer(HairSalonReviewsList);
