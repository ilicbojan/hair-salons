import React, { Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Table, Spin } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { IRole } from '../../../app/models/role';

const RoleList = () => {
  const rootStore = useContext(RootStoreContext);
  const { rolesRegistry, loadingRoles } = rootStore.roleStore;

  const columns: ColumnProps<IRole>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: IRole, b: IRole) => ('' + a.name).localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    // {
    //   key: 'edit',
    //   title: 'Edit',
    //   dataIndex: 'id',
    //   width: '100px',
    //   render: (dataIndex) => (
    //     <Link to={`/roles/${dataIndex}`}>
    //       <Button block type='primary'>
    //         Edit
    //       </Button>
    //     </Link>
    //   ),
    // },
    // {
    //   key: 'delete',
    //   title: 'Delete',
    //   dataIndex: 'id',
    //   width: '100px',
    //   render: (dataIndex) => (
    //     <Form>
    //       <Spin spinning={target === dataIndex && submittingDelete}>
    //         <Button
    //           onClick={(e) => deleteRole(dataIndex, e)}
    //           id={dataIndex}
    //           title={dataIndex}
    //           block
    //           danger
    //           type='primary'
    //           htmlType='submit'
    //         >
    //           Delete
    //         </Button>
    //       </Spin>
    //     </Form>
    //   ),
    // },
  ];

  return (
    <Fragment>
      <Spin spinning={loadingRoles}>
        <Table<IRole>
          scroll={{ x: true }}
          rowKey={(record) => record.id!.toString()}
          columns={columns}
          dataSource={Array.from(rolesRegistry.values())}
        />
      </Spin>
    </Fragment>
  );
};

export default observer(RoleList);
