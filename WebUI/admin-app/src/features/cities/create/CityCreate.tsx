import React, { useContext, Fragment } from 'react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Input, Spin, Button, Form, Select } from 'antd';
import ErrorMessage from '../../../app/common/form/ErrorMessage';
import { observer } from 'mobx-react-lite';

const CityCreate = () => {
  const rootStore = useContext(RootStoreContext);
  const { createCity, submitting, error } = rootStore.cityStore;
  const { loadingCountries, countriesRegistry } = rootStore.countryStore;

  const [form] = Form.useForm();

  const { Option } = Select;

  const handleFinish = (values: any) => {
    const newCity = values;
    createCity(newCity);
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
        <Spin spinning={loadingCountries}>
          <Form.Item
            label='Country'
            name='countryId'
            rules={[{ required: true, message: 'Country is required' }]}
          >
            <Select placeholder='Select country' allowClear>
              {Array.from(countriesRegistry.values()).map((country) => (
                <Option key={country.id} value={country.id}>
                  {country.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Spin>
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

export default observer(CityCreate);
