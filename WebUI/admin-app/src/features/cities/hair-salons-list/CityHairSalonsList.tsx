import React, { useContext, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { Button, Spin, Table } from 'antd';
import { IHairSalon } from '../../../app/models/hairSalon';

const CityHairSalonsList = () => {
  const rootStore = useContext(RootStoreContext);
  const { city, loadingCities } = rootStore.cityStore;

  const columns: ColumnProps<any>[] = [
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
      key: 'address',
      title: 'Address',
      dataIndex: 'address',
      sorter: (a: IHairSalon, b: IHairSalon) =>
        ('' + a.address).localeCompare(b.address),
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
      key: 'edit',
      title: 'Edit',
      dataIndex: 'id',
      width: '100px',
      render: (dataIndex) => (
        <Link to={`/hairSalons/${dataIndex}`}>
          <Button block type='primary'>
            Edit
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Fragment>
      <Spin spinning={loadingCities}>
        <Table
          scroll={{ x: true }}
          rowKey={(record) => record.id!.toString()}
          columns={columns}
          dataSource={city?.hairSalons}
        />
      </Spin>
    </Fragment>
  );
};

export default observer(CityHairSalonsList);
