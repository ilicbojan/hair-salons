import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { RootStoreContext } from '../../../app/stores/rootStore';

const NavSide = () => {
  const rootStore = useContext(RootStoreContext);
  const { logout } = rootStore.userStore;

  const url = useLocation();

  // const menu = (
  //   <Menu>
  //     <Menu.Item>1</Menu.Item>
  //     <Menu.Item>2</Menu.Item>
  //     <Menu.Item onClick={logout}>
  //       <LogoutOutlined /> Logout
  //     </Menu.Item>
  //   </Menu>
  // );

  return (
    <Layout.Sider
      width={250}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div
        style={{
          height: '60px',
          backgroundColor: 'black',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* <Dropdown overlay={menu} placement='bottomCenter'>
          <Button style={{ color: '#fff' }} type='link'>
            {user?.username} <DownOutlined />
          </Button>
        </Dropdown> */}
        <div
          onClick={logout}
          style={{ color: '#fff', cursor: 'pointer', paddingLeft: '24px' }}
        >
          <LogoutOutlined /> Logout
        </div>
      </div>
      <Menu selectedKeys={[url.pathname]} mode='inline' theme='dark'>
        {/* <Menu.Item key='/dashboard'>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </Menu.Item> */}
        <Menu.Item key='/hair-salons/list'>
          <NavLink to='/hair-salons/list'>Hair Salons</NavLink>
        </Menu.Item>
        <Menu.Item key='/reservations/list'>
          <NavLink to='/reservations/list'>Reservations</NavLink>
        </Menu.Item>
        <Menu.Item key='/users'>
          <NavLink to='/users'>Users</NavLink>
        </Menu.Item>
        <Menu.Item key='/roles'>
          <NavLink to='/roles'>Roles</NavLink>
        </Menu.Item>
        <Menu.Item key='/contacts'>
          <NavLink to='/contacts'>Contacts</NavLink>
        </Menu.Item>
        <Menu.Item key='/cities'>
          <NavLink to='/cities'>Cities</NavLink>
        </Menu.Item>
        <Menu.Item key='/countries'>
          <NavLink to='/countries'>Countries</NavLink>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default NavSide;
