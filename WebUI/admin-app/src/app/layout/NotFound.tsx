import React from 'react';
import { Link } from 'react-router-dom';
import '@ant-design/icons';
import { Button, Col, Row, Result } from 'antd';

const NotFound = () => {
  return (
    <Row justify='center' align='middle'>
      <Col span={16} style={{ textAlign: 'center' }}>
        <Result
          status='404'
          title='404'
          subTitle='Sorry, the page you visited does not exist.'
          extra={
            <Link to='/hair-salons/list'>
              <Button size='large' type='primary'>
                Go to hair salons
              </Button>
            </Link>
          }
        />
      </Col>
    </Row>
  );
};

export default NotFound;
