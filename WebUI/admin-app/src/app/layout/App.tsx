import React, { Fragment, useContext, useEffect } from 'react';
import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import NavSide from '../../features/nav/nav-side/NavSide';
import { Layout, Spin } from 'antd';
import LoginPage from '../../features/users/login/LoginPage';
import { LoadingOutlined } from '@ant-design/icons';
import { RootStoreContext } from '../stores/rootStore';
import PrivateRoute from './PrivateRoute';
import HairSalonsList from '../../features/hair-salons/list/HairSalonsList';
import HairSalonCreate from '../../features/hair-salons/create/HairSalonCreate';
import HairSalonDetails from '../../features/hair-salons/details/HairSalonDetails';
import NotFound from './NotFound';
import CityDashboard from '../../features/cities/dashboard/CityDashboard';
import CountryDashboard from '../../features/countries/dashboard/CountryDashboard';
import CountryDetails from '../../features/countries/details/CountryDetails';
import CityDetails from '../../features/cities/details/CityDetails';
import RoleDashboard from '../../features/roles/dashboard/RoleDashboard';
import ReservationCreate from '../../features/reservations/create/ReservationCreate';
import ReservationsList from '../../features/reservations/list/ReservationsList';
import ContactDashboard from '../../features/contacts/dashboard/ContactDashboard';
import UsersList from '../../features/users/list/UsersList';
import UserCreate from '../../features/users/create/UserCreate';

Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />);

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { appLoaded, setAppLoaded, token } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;
  const { loadHairSalons } = rootStore.hairSalonStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
    loadHairSalons();
  }, [getUser, setAppLoaded, token, loadHairSalons]);

  if (!appLoaded)
    return (
      <Spin
        style={{ position: 'absolute', left: '50%', top: '50%' }}
        tip='Loadin app..'
      ></Spin>
    );

  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={LoginPage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Layout style={{ minHeight: '100vh' }}>
            <Layout>
              <NavSide />
              <Layout>
                <Layout.Content
                  style={{
                    padding: '25px 30px',
                    marginLeft: '250px',
                  }}
                >
                  <Switch>
                    <PrivateRoute
                      path='/hair-salons/list'
                      component={HairSalonsList}
                    />
                    <PrivateRoute
                      path='/hair-salons/create'
                      component={HairSalonCreate}
                    />
                    <PrivateRoute
                      path='/hair-salons/details/:id'
                      component={HairSalonDetails}
                    />
                    <PrivateRoute
                      path='/reservations/create'
                      component={ReservationCreate}
                    />
                    <PrivateRoute
                      path='/reservations/list'
                      component={ReservationsList}
                    />
                    <PrivateRoute
                      exact
                      path='/cities'
                      component={CityDashboard}
                    />
                    <PrivateRoute path='/cities/:id' component={CityDetails} />
                    <PrivateRoute
                      exact
                      path='/countries'
                      component={CountryDashboard}
                    />
                    <PrivateRoute
                      path='/countries/:id'
                      component={CountryDetails}
                    />
                    <PrivateRoute
                      exact
                      path='/contacts'
                      component={ContactDashboard}
                    />
                    <PrivateRoute
                      exact
                      path='/roles'
                      component={RoleDashboard}
                    />
                    <PrivateRoute exact path='/users' component={UsersList} />
                    <PrivateRoute
                      exact
                      path='/users/create'
                      component={UserCreate}
                    />

                    <PrivateRoute component={NotFound} />
                  </Switch>
                </Layout.Content>
              </Layout>
            </Layout>
          </Layout>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
