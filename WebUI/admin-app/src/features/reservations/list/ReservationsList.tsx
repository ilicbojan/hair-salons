import React, { useContext, Fragment, useEffect } from 'react';
import { S } from '../../../styles';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IReservation } from '../../../app/models/reservation';
import moment from 'moment';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { Button, Row, Table, Spin, Form } from 'antd';
import { observer } from 'mobx-react-lite';

const ReservationsList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    reservationsRegistry,
    loading,
    submitting,
    approveReservation,
    target,
    loadReservations,
    deleteReservation,
    submittingDelete,
  } = rootStore.reservationStore;

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  const columns: ColumnProps<IReservation>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'hairSalon',
      title: 'Hair salon',
      dataIndex: ['hairSalon', 'name'],
      sorter: (a: IReservation, b: IReservation) =>
        ('' + a.hairSalon.name).localeCompare(b.hairSalon.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'user',
      title: 'User',
      dataIndex: ['user', 'username'],
      sorter: (a: IReservation, b: IReservation) =>
        ('' + a.user.username).localeCompare('' + b.user.username),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'date',
      title: 'Date',
      dataIndex: 'date',
      sorter: (a: IReservation, b: IReservation) =>
        moment(a.date).unix() - moment(b.date).unix(),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'startTime',
      title: 'Start time',
      dataIndex: 'startTime',
    },
    // {
    //   key: 'endTime',
    //   title: 'End time',
    //   dataIndex: 'endTime',
    // },
    {
      key: 'status',
      title: 'Status',
      dataIndex: ['status', 'status'],
      sorter: (a: IReservation, b: IReservation) =>
        ('' + a.status.status).localeCompare('' + b.status.status),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'approve',
      title: 'Approve',
      dataIndex: 'id',
      width: '100px',
      render: (dataIndex, res) =>
        res.status.status === 'pending' && (
          <Form>
            <Spin spinning={Number(target) === dataIndex && submitting}>
              <Button
                onClick={(e) => approveReservation(e, dataIndex)}
                id={dataIndex}
                title={dataIndex}
                block
                type='primary'
                htmlType='submit'
              >
                Approve
              </Button>
            </Spin>
          </Form>
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
              onClick={(e) => deleteReservation(e, dataIndex)}
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
        <h2>Reservations list</h2>
      </S.HeaderContainer>
      <S.ContentContainer>
        <Row justify='space-between'>
          <Link to='/reservations/create'>
            <Button type='primary' size='large'>
              Create new
            </Button>
          </Link>
        </Row>
        <Table<IReservation>
          scroll={{ x: true }}
          loading={loading}
          rowKey={(record) => record.id!.toString()}
          columns={columns}
          dataSource={Array.from(reservationsRegistry.values())}
        />
      </S.ContentContainer>
    </Fragment>
  );
};

export default observer(ReservationsList);
