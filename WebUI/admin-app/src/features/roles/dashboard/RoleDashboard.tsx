import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { S } from '../../../styles';
import { Row, Col } from 'antd';
import { RootStoreContext } from '../../../app/stores/rootStore';
import RoleList from '../list/RoleList';
import RoleCreate from '../create/RoleCreate';

const RoleDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadRoles } = rootStore.roleStore;

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  return (
    <Fragment>
      <S.HeaderContainer>
        <h2>Roles</h2>
      </S.HeaderContainer>
      <Row justify='space-between'>
        <Col span={16}>
          <S.ContentContainer>
            <RoleList />
          </S.ContentContainer>
        </Col>
        <Col span={7}>
          <S.ContentContainer>
            <RoleCreate />
          </S.ContentContainer>
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(RoleDashboard);
