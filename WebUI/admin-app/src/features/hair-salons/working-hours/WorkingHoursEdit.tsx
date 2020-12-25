import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Row, Col, Select, Button, Input, Spin, Space } from 'antd';
import { useForm } from 'antd/lib/form/util';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IWorkingHoursFormValues } from '../../../app/models/workingHour';
import ErrorMessage from '../../../app/common/form/ErrorMessage';
import { Link } from 'react-router-dom';
import { getDay, openHours, closeHours } from './workingHours.util';

const WorkingHoursCreate = () => {
  const rootStore = useContext(RootStoreContext);
  const { editWorkingHours, error, submitting } = rootStore.workingHourStore;
  const { hairSalon } = rootStore.hairSalonStore;

  const [form] = useForm();

  const { Option } = Select;

  const handleFinish = (values: any) => {
    let updatedWorkingHours: IWorkingHoursFormValues = {
      hairSalonId: hairSalon!.id!,
      ...values,
    };
    editWorkingHours(updatedWorkingHours);
  };

  const initial = {
    workingHours: hairSalon?.workingHours,
  };

  return (
    <Form
      layout='horizontal'
      initialValues={initial}
      form={form}
      onFinish={handleFinish}
    >
      {initial.workingHours!.map((wh: any) => (
        <Row key={wh.day} justify='space-between'>
          <Col span={1}>
            <Form.Item
              name={['workingHours', wh.day - 1, 'id']}
              style={{ display: 'none' }}
            >
              <Input />
            </Form.Item>
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
            Update
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
