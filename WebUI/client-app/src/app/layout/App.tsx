import React, { Fragment, useContext, useEffect } from 'react';
import HomePage from '../../features/home/page/HomePage';
import { Route, Switch, withRouter } from 'react-router-dom';
import PartnershipPage from '../../features/partnership/page/PartnershipPage';
import HairSalonList from '../../features/hair-salons/list/HairSalonList';
import { RootStoreContext } from '../stores/rootStore';
import Modal from '../common/modal/Modal';
import { observer } from 'mobx-react-lite';
import HairSalonDetails from '../../features/hair-salons/details/HairSalonDetails';
import NotFound from './not-found/NotFound';
import { ToastContainer } from 'react-toastify';
import WorkingHours from '../../features/working-hours/WorkingHours';
import HairSalonEdit from '../../features/hair-salons/edit/HairSalonEdit';
import ReservationList from '../../features/reservations/list/ReservationList';
import ImageList from '../../features/images/list/ImageList';
import PrivateRoute from './PrivateRoute';
import FavouritesList from '../../features/favourites/list/FavouritesList';
import Nav from './nav/navigation/Nav';
import LoadingSpinner from './spinner/LoadingSpinner';
import UserEdit from '../../features/users/edit/UserEdit';
import ServicesDashboard from '../../features/services/dashboard/ServicesDashboard';

function App() {
  const rootStore = useContext(RootStoreContext);
  const { modal } = rootStore.modalStore;
  const { token, setAppLoaded, appLoaded } = rootStore.commonStore;
  const { currentUser, isClient } = rootStore.userStore;
  const { loadMyHairSalon } = rootStore.hairSalonStore;
  const { loadCities } = rootStore.cityStore;
  const { loadNext7Dates } = rootStore.reservationStore;

  useEffect(() => {
    if (token) {
      currentUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [currentUser, token, setAppLoaded]);

  useEffect(() => {
    if (isClient) {
      loadMyHairSalon();
    }
  }, [isClient, loadMyHairSalon]);

  useEffect(() => {
    loadNext7Dates();
    loadCities();
  }, [loadCities, loadNext7Dates]);

  if (!appLoaded) return <LoadingSpinner />;

  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
      <Nav />
      <div className='appContainer'>
        <Modal show={modal.open}></Modal>
        <Route exact path='/' component={HomePage} />
        <Route
          path={'/(.+)'}
          render={() => (
            <Fragment>
              <Switch>
                <Route exact path='/salons' component={HairSalonList} />
                <Route exact path='/salons/:id' component={HairSalonDetails} />
                <Route exact path='/partnership' component={PartnershipPage} />
                <PrivateRoute exact path='/profile/edit' component={UserEdit} />
                <PrivateRoute
                  exact
                  path='/reservations'
                  component={ReservationList}
                />
                <PrivateRoute
                  exact
                  path='/favourites'
                  user
                  component={FavouritesList}
                />
                <PrivateRoute
                  path='/my-hair-salon'
                  client
                  component={HairSalonEdit}
                />
                <PrivateRoute
                  exact
                  path='/working-hours'
                  client
                  component={WorkingHours}
                />
                <PrivateRoute
                  path='/services'
                  client
                  component={ServicesDashboard}
                />
                <PrivateRoute path='/images' client component={ImageList} />
                <Route component={NotFound} />
              </Switch>
            </Fragment>
          )}
        />
      </div>
    </Fragment>
  );
}

export default withRouter(observer(App));
