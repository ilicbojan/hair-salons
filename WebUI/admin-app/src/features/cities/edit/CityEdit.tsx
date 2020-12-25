import React, { useContext, useEffect, Fragment } from 'react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import FormItem from 'antd/lib/form/FormItem';
import { Form, Input, Spin, Button, Select } from 'antd';
import ErrorMessage from '../../../app/common/form/ErrorMessage';
import { observer } from 'mobx-react-lite';

const CityEdit = () => {
  const rootStore = useContext(RootStoreContext);
  const { editCity, city, submitting, error } = rootStore.cityStore;
  const { loadingCountries, countriesRegistry } = rootStore.countryStore;

  const { Option } = Select;

  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  });

  const handleFinish = (values: any) => {
    let updatedCity = values;
    updatedCity.id = city!.id;
    editCity(updatedCity);
  };

  return (
    <Fragment>
      <Form
        initialValues={city!}
        form={form}
        layout='vertical'
        onFinish={handleFinish}
      >
        <FormItem
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input />
        </FormItem>
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
            Update
          </Button>
        </Spin>
      </Form>
    </Fragment>
  );
};

export default observer(CityEdit);
