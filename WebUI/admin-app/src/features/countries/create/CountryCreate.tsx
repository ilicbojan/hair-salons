import React, { Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Form, Input, Button, Spin } from 'antd';
import ErrorMessage from '../../../app/common/form/ErrorMessage';

const CountryCreate = () => {
  const rootStore = useContext(RootStoreContext);
  const { createCountry, submitting, error } = rootStore.countryStore;

  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const newCountry = { ...values };
    createCountry(newCountry);
    form.resetFields();
  };

  return (
    <Fragment>
      <Form form={form} onFinish={handleFinish} layout='vertical'>
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input />
        </Form.Item>
        {error && <ErrorMessage error={error} />}
        <Spin spinning={submitting}>
          <Button type='primary' htmlType='submit' block>
            Create
          </Button>
        </Spin>
      </Form>
    </Fragment>
  );
};

export default observer(CountryCreate);
