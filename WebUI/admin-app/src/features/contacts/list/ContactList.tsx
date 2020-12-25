import { Spin } from 'antd';
import Table, { ColumnProps } from 'antd/lib/table';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext } from 'react';
import { IContact } from '../../../app/models/contact';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ContactList = () => {
  const rootStore = useContext(RootStoreContext);
  const { contactRegistry, loadingContacts } = rootStore.commonStore;

  const columns: ColumnProps<IContact>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: IContact, b: IContact) => ('' + a.name).localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      sorter: (a: IContact, b: IContact) =>
        ('' + a.email).localeCompare(b.email),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'phoneNumber',
      title: 'Phone',
      dataIndex: 'phoneNumber',
      sorter: (a: IContact, b: IContact) =>
        ('' + a.phoneNumber).localeCompare(b.phoneNumber),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'package',
      title: 'Package',
      dataIndex: 'package',
      sorter: (a: IContact, b: IContact) =>
        ('' + a.package).localeCompare(b.package),
      sortDirections: ['ascend', 'descend'],
    },
  ];

  return (
    <Fragment>
      <Spin spinning={loadingContacts}>
        <Table<IContact>
          scroll={{ x: true }}
          rowKey={(record) => record.id!.toString()}
          columns={columns}
          dataSource={Array.from(contactRegistry.values())}
        />
      </Spin>
    </Fragment>
  );
};

export default observer(ContactList);
