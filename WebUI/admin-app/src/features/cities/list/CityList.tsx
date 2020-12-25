import React, { useContext, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { Form, Button, Spin, Table } from 'antd';
import { ICity } from '../../../app/models/city';

const CityList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    citiesRegistry,
    loadingCities,
    deleteCity,
    submittingDelete,
    target,
  } = rootStore.cityStore;

  const columns: ColumnProps<ICity>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: ICity, b: ICity) => ('' + a.name).localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'country',
      title: 'Country',
      dataIndex: ['country', 'name'],
      sorter: (a: ICity, b: ICity) =>
        ('' + a.country.name).localeCompare(b.country.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'edit',
      title: 'Edit',
      dataIndex: 'id',
      width: '100px',
      render: (dataIndex) => (
        <Link to={`/cities/${dataIndex}`}>
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
          <Spin spinning={Number(target) === dataIndex && submittingDelete}>
            <Button
              onClick={(e) => deleteCity(e, dataIndex)}
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
      <Spin spinning={loadingCities}>
        <Table<ICity>
          scroll={{ x: true }}
          rowKey={(record) => record.id!.toString()}
          columns={columns}
          dataSource={Array.from(citiesRegistry.values())}
        />
      </Spin>
    </Fragment>
  );
};

export default observer(CityList);
