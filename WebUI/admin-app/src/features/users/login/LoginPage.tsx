import React, { useContext } from 'react';
import { S } from './LoginPage.styles';
import { Form, Input, Button, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Redirect } from 'react-router-dom';
import ErrorMessage from '../../../app/common/form/ErrorMessage';

const LoginPage = () => {
  const rootStore = useContext(RootStoreContext);
  const { login, submitting, isLoggedIn, error } = rootStore.userStore;

  const handleFinish = (values: any) => {
    login(values);
  };

  if (isLoggedIn) return <Redirect to='/hair-salons/list' />;

  return (
    <S.LoginPage>
      <Form
        name='login'
        layout='vertical'
        initialValues={{ remember: true }}
        onFinish={handleFinish}
      >
        <S.Container>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Please input your email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password' }]}
          >
            <Input.Password />
          </Form.Item>
          {error && <ErrorMessage error={error} />}
          <Form.Item>
            <Spin spinning={submitting}>
              <Button
                style={{ marginTop: '10px' }}
                block
                size='large'
                type='primary'
                htmlType='submit'
              >
                Log in
              </Button>
            </Spin>
          </Form.Item>
        </S.Container>
      </Form>
    </S.LoginPage>
  );
};

export default observer(LoginPage);
