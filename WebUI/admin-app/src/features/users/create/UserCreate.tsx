import { Button, Col, Form, Input, Row, Select, Space, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../../app/common/form/ErrorMessage';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from '../../../styles';

const UserCreate = () => {
  const rootStore = useContext(RootStoreContext);
  const { createUser, submitting, error } = rootStore.userStore;
  const { loadRoles, rolesRegistry } = rootStore.roleStore;

  const [form] = Form.useForm();

  const { Option } = Select;

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  const handleFinish = (values: any) => {
    let newUser = { ...values };
    createUser(newUser);
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Row justify='center'>
      <Col span={24}>
        <S.HeaderContainer>
          <h2>Create hair salon</h2>
        </S.HeaderContainer>
        <S.ContentContainer>
          <Form layout='vertical' form={form} onFinish={handleFinish}>
            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, message: 'Email is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Username'
              name='username'
              rules={[{ required: true, message: 'Username is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input type='password' />
            </Form.Item>
            {/* <Form.Item
              label='Phone'
              name='phone'
              rules={[{ required: true, message: 'Phone is required' }]}
            >
              <Input />
            </Form.Item> */}
            <Form.Item
              label='Role'
              name='role'
              rules={[{ required: true, message: 'Role is required' }]}
            >
              <Select placeholder='Select role' allowClear>
                {Array.from(rolesRegistry.values()).map((role) => (
                  <Option key={role.name} value={role.name}>
                    {role.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {error && <ErrorMessage error={error} />}
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
              <Link to='/users'>
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

export default observer(UserCreate);
