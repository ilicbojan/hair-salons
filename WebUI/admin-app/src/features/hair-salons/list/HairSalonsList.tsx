import React, { useContext, Fragment } from 'react';
import { Table, Button, Row, Form, Spin } from 'antd';
import { IHairSalon } from '../../../app/models/hairSalon';
import { ColumnProps } from 'antd/lib/table';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { S } from '../../../styles';

const HairSalonsList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    hairSalonsRegistry,
    loadingInitial,
    submitting,
    deleteHairSalon,
    target,
  } = rootStore.hairSalonStore;

  const columns: ColumnProps<IHairSalon>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: IHairSalon, b: IHairSalon) =>
        ('' + a.name).localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      sorter: (a: IHairSalon, b: IHairSalon) =>
        ('' + a.email).localeCompare(b.email),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'isPayed',
      title: 'Payed',
      dataIndex: 'isPayed',
      render: (dataIndex) => (dataIndex ? 'Yes' : 'No'),
      sorter: (a: IHairSalon, b: IHairSalon) =>
        Number(b.isPayed) - Number(a.isPayed),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'isPremium',
      title: 'Premium',
      dataIndex: 'isPremium',
      render: (dataIndex) => (dataIndex ? 'Yes' : 'No'),
      sorter: (a: IHairSalon, b: IHairSalon) =>
        Number(b.isPremium) - Number(a.isPremium),
      sortDirections: ['ascend', 'descend'],
    },

    {
      key: 'phone',
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a: IHairSalon, b: IHairSalon) =>
        ('' + a.phone).localeCompare(b.phone),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'city',
      title: 'City',
      dataIndex: ['city', 'name'],
      sorter: (a: IHairSalon, b: IHairSalon) =>
        ('' + a.city).localeCompare('' + b.city),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'edit',
      title: 'Edit',
      dataIndex: 'id',
      width: '100px',
      render: (dataIndex) => (
        <Link to={`/hair-salons/details/${dataIndex}`}>
          <Button block type='primary'>
            Edit
          </Button>
        </Link>
      ),
    },
    {
      key: 'delete',
      title: 'Delete',
      dataIndex: 'id',
      width: '100px',
      render: (dataIndex) => (
        <Form>
          <Spin spinning={Number(target) === dataIndex && submitting}>
            <Button
              onClick={(e) => deleteHairSalon(e, dataIndex)}
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
        <h2>Hair Salons list</h2>
      </S.HeaderContainer>
      <S.ContentContainer>
        <Row justify='space-between'>
          <Link to='/hair-salons/create'>
            <Button type='primary' size='large'>
              Create new
            </Button>
          </Link>
        </Row>
        <Table<IHairSalon>
          scroll={{ x: true }}
          loading={loadingInitial}
          rowKey={(record) => record.id!.toString()}
          columns={columns}
          dataSource={Array.from(hairSalonsRegistry.values())}
        />
      </S.ContentContainer>
    </Fragment>
  );
};

export default observer(HairSalonsList);
