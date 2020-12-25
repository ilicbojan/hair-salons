import React from 'react';
import { Input, Layout } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const NavTop = () => {
  return (
    <Layout.Header
      style={{
        position: 'fixed',
        width: 'calc(100%-250px)',
        zIndex: 1,
        marginLeft: '250px',
        padding: '0',
      }}
    >
      <div style={{ padding: '0 30px' }}>
        <Input placeholder='Search...' prefix={<SearchOutlined />} />
      </div>
    </Layout.Header>
  );
};

export default NavTop;
