import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Row, Col, Select, Button, Input, Spin, Space } from 'antd';
import { useForm } from 'antd/lib/form/util';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IWorkingHoursFormValues } from '../../../app/models/workingHour';
import ErrorMessage from '../../../app/common/form/ErrorMessage';
import { Link } from 'react-router-dom';
import { openHours, closeHours, getDay } from './workingHours.util';

const WorkingHoursCreate = () => {
  const rootStore = useContext(RootStoreContext);
  const { createWorkingHours, error, submitting } = rootStore.workingHourStore;
  const { hairSalon } = rootStore.hairSalonStore;

  const [form] = useForm();

  const { Option } = Select;

  useEffect(() => {
    form.resetFields();
  });

  const handleFinish = (values: any) => {
    // turn object of objects in array of objects
    // const whs = Object.keys(values).map((key) => values[key]);
    let newWhs: IWorkingHoursFormValues = {
      hairSalonId: hairSalon!.id!,
      ...values,
    };
    createWorkingHours(newWhs);
    console.log(newWhs);
  };

  const initial = {
    workingHours: [
      {
        day: 1,
      },
      {
        day: 2,
      },
      {
        day: 3,
      },
      {
        day: 4,
      },
      {
        day: 5,
      },
      {
        day: 6,
      },
      {
        day: 7,
      },
    ],
  };

  return (
    <Form
      layout='horizontal'
      initialValues={initial}
      form={form}
      onFinish={handleFinish}
    >
      {initial.workingHours.map((wh) => (
        <Row key={wh.day} justify='space-between'>
          <Col span={1}>
            <Form.Item
              name={['workingHours', wh.day - 1, 'day']}
              style={{ display: 'none' }}
            >
              <Input />
            </Form.Item>
            <h3>{getDay(wh.day)}</h3>
          </Col>
          <Col span={8}>
            <Form.Item
              name={['workingHours', wh.day - 1, 'openTime']}
              label='Open time:'
              rules={[{ required: true, message: 'Open time is required' }]}
            >
              <Select placeholder='Select open time' allowClear>
                {openHours.map((hour) => (
                  <Option key={hour} value={hour}>
                    {hour}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={['workingHours', wh.day - 1, 'closeTime']}
              label='Close time:'
              rules={[{ required: true, message: 'Close time is required' }]}
            >
              <Select placeholder='Select close time' allowClear>
                {closeHours.map((hour) => (
                  <Option key={hour} value={hour}>
                    {hour}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      ))}
      {error && <ErrorMessage error={error} />}
      <Space size='middle'>
        <Spin spinning={submitting}>
          <Button htmlType='submit' type='primary' size='large'>
            Create
          </Button>
        </Spin>
        <Link to='/hair-salons/list'>
          <Button size='large' type='default'>
            List
          </Button>
        </Link>
      </Space>
    </Form>
  );
};

export default observer(WorkingHoursCreate);
