import { Button, Col, Form, Input, Row, Spin } from 'antd';
import Table, { ColumnProps } from 'antd/lib/table';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useEffect } from 'react';
import ErrorMessage from '../../../app/common/form/ErrorMessage';
import { IService } from '../../../app/models/service';
import { RootStoreContext } from '../../../app/stores/rootStore';

const Services = () => {
  const rootStore = useContext(RootStoreContext);
  const { hairSalon } = rootStore.hairSalonStore;
  const {
    loadingServices,
    loadServices,
    serviceRegistry,
    deleteService,
    target,
    submittingDelete,
    createService,
    submitting,
    error,
  } = rootStore.serviceStore;

  const [form] = Form.useForm();

  useEffect(() => {
    loadServices(hairSalon?.id!);
    form.setFieldsValue({
      hairSalonId: hairSalon?.id!,
    });
  }, [loadServices, form, hairSalon]);

  const handleFinish = (values: any) => {
    const newService = { ...values };
    createService(newService);
  };

  const columns: ColumnProps<IService>[] = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 'price',
      title: 'Price',
      dataIndex: 'price',
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
              onClick={(e) => deleteService(e, dataIndex)}
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
      <Row justify='space-between'>
        <Col span={16}>
          <Table<IService>
            scroll={{ x: true }}
            loading={loadingServices}
            rowKey={(record) => record.id!.toString()}
            columns={columns}
            dataSource={Array.from(serviceRegistry.values())}
          />
        </Col>
        <Col span={7}>
          <Form form={form} onFinish={handleFinish} layout='vertical'>
            <Form.Item
              label='Name'
              name='name'
              rules={[{ required: true, message: 'Name is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Price'
              name='price'
              rules={[{ required: true, message: 'Price is required' }]}
            >
              <Input type='number' />
            </Form.Item>
            {error && <ErrorMessage error={error} />}
            <Spin spinning={submitting}>
              <Button type='primary' htmlType='submit' block>
                Create
              </Button>
            </Spin>
            <Form.Item
              name='hairSalonId'
              rules={[{ required: true, message: 'Hair salon is required' }]}
            >
              <Input type='hidden' />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(Services);
