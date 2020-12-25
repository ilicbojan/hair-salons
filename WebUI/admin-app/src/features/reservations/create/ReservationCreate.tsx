import React, { useContext } from 'react';
import { Form, Select, Button, Spin, Space, Col, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IReservation } from '../../../app/models/reservation';
import { useForm } from 'antd/lib/form/util';
import { IHairSalon } from '../../../app/models/hairSalon';
import { S } from '../../../styles';
import { Link } from 'react-router-dom';

const ReservationCreate = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createReservation,
    loadFreeTerms,
    getFreeTermHoursForDate,
    emptyFreeDates,
    emptyFreeHours,
    freeDates,
    freeHours,
    submitting,
  } = rootStore.reservationStore;
  const { hairSalonsRegistry } = rootStore.hairSalonStore;

  const [form] = useForm();

  const { Option } = Select;

  // const handleChange = (value: any, dateString: string) => {
  //   const date: Moment = value._d;
  //   console.log(dateString);
  // };

  const handleHairSalonChange = (value: any) => {
    loadFreeTerms(value);
  };

  const handleDateChange = (value: any) => {
    emptyFreeHours();
    getFreeTermHoursForDate(value);
  };

  const handleFinish = (values: any) => {
    console.log(values);
    const newReservation: IReservation = values;
    // newReservation.date = values.date._d.toISOString().slice(0, 10);
    createReservation(newReservation);
    handleReset();
  };

  const handleReset = () => {
    form.resetFields();
    emptyFreeDates();
    emptyFreeHours();
  };

  return (
    <Row justify='center'>
      <Col span={24}>
        <S.HeaderContainer>
          <h2>Create reservation</h2>
        </S.HeaderContainer>
        <S.ContentContainer>
          <Form form={form} onFinish={handleFinish} layout='vertical'>
            <Form.Item
              label='Hair Salon'
              name='hairSalonId'
              rules={[{ required: true, message: 'Hair salon id is required' }]}
            >
              <Select
                placeholder='Select hair salon'
                onChange={handleHairSalonChange}
                allowClear
              >
                {Array.from(hairSalonsRegistry.values())
                  .filter((so: IHairSalon) => so.isPremium && so.isPayed)
                  .map((so: IHairSalon) => (
                    <Option key={so.id} value={so.id!}>
                      {so.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label='Date'
              name='date'
              rules={[{ required: true, message: 'Date is required' }]}
            >
              {/* <DatePicker
            disabledDate={(date) => moment().subtract(1, 'days') > date}
            onChange={handleChange}
          /> */}
              <Select
                placeholder='Select date'
                onChange={handleDateChange}
                allowClear
              >
                {freeDates.map((date) => (
                  <Option key={date} value={date}>
                    {date}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label='Start time'
              name='startTime'
              rules={[{ required: true, message: 'Start time is required' }]}
            >
              <Select placeholder='Select time' allowClear>
                {freeHours.map((hour) => (
                  <Option key={hour} value={hour}>
                    {hour}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Space size='middle'>
              <Spin spinning={submitting}>
                <Button size='large' type='primary' htmlType='submit'>
                  Create
                </Button>
              </Spin>
              <Button
                size='large'
                ghost
                type='primary'
                htmlType='reset'
                onClick={handleReset}
              >
                Reset
              </Button>
              <Link to='/reservations/list'>
                <Button size='large' type='default'>
                  List
                </Button>
              </Link>
            </Space>
          </Form>
        </S.ContentContainer>
      </Col>
    </Row>
  );
};

export default observer(ReservationCreate);
