import React, { Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Table, Spin, Button, Form } from 'antd';
import { ICountry } from '../../../app/models/country';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';

const CountryList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    countriesRegistry,
    loadingCountries,
    deleteCountry,
    submittingDelete,
    target,
  } = rootStore.countryStore;

  const columns: ColumnProps<ICountry>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: ICountry, b: ICountry) => ('' + a.name).localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'edit',
      title: 'Edit',
      dataIndex: 'id',
      width: '100px',
      render: (dataIndex) => (
        <Link to={`/countries/${dataIndex}`}>
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
              onClick={(e) => deleteCountry(e, dataIndex)}
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
      <Spin spinning={loadingCountries}>
        <Table<ICountry>
          scroll={{ x: true }}
          rowKey={(record) => record.id!.toString()}
          columns={columns}
          dataSource={Array.from(countriesRegistry.values())}
        />
      </Spin>
    </Fragment>
  );
};

export default observer(CountryList);
