import { Row, Button, Form, Spin } from 'antd';
import Table, { ColumnProps } from 'antd/lib/table';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../../app/models/user';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from '../../../styles';

const UsersList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadUsers,
    userRegistry,
    loadingUsers,
    target,
    deleteUser,
    submitting,
  } = rootStore.userStore;

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const columns: ColumnProps<IUser>[] = [
    {
      key: 'username',
      title: 'Username',
      dataIndex: 'username',
      sorter: (a: IUser, b: IUser) =>
        ('' + a.username).localeCompare(b.username),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      sorter: (a: IUser, b: IUser) => ('' + a.email).localeCompare(b.email),
      sortDirections: ['ascend', 'descend'],
    },
    // {
    //   key: 'phoneNumber',
    //   title: 'Phone',
    //   dataIndex: 'phoneNumber',
    //   sorter: (a: IUser, b: IUser) =>
    //     ('' + a.phoneNumber).localeCompare(b.phoneNumber),
    //   sortDirections: ['ascend', 'descend'],
    // },
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'delete',
      title: 'Delete',
      dataIndex: 'id',
      width: '100px',
      render: (dataIndex) => (
        <Form>
          <Spin spinning={target === dataIndex && submitting}>
            <Button
              onClick={(e) => deleteUser(e, dataIndex)}
              id={dataIndex}
              title={dataIndex}
              block
              danger
              type='primary'
              htmlType='submit'
            >
              Delete
            </Button>
          </Spin>
        </Form>
      ),
    },
  ];

  return (
    <Fragment>
      <S.HeaderContainer>
        <h2>Users list</h2>
      </S.HeaderContainer>
      <S.ContentContainer>
        <Row justify='space-between'>
          <Link to='/users/create'>
            <Button type='primary' size='large'>
              Create new
            </Button>
          </Link>
        </Row>
        <Table<IUser>
          scroll={{ x: true }}
          loading={loadingUsers}
          rowKey={(record) => record.id!.toString()}
          columns={columns}
          dataSource={Array.from(userRegistry.values())}
        />
      </S.ContentContainer>
    </Fragment>
  );
};

export default observer(UsersList);
