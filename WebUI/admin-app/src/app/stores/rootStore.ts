import { configure } from 'mobx';
import { createContext } from 'react';
import HairSalonStore from './hairSalonStore';
import UserStore from './userStore';
import CityStore from './cityStore';
import CommonStore from './commonStore';
import CountryStore from './countryStore';
import ReviewStore from './reviewStore';
import RoleStore from './roleStore';
import WorkingHourStore from './workingHourStore';
import ReservationStore from './reservationStore';
import ServiceStore from './serviceStore';

configure({ enforceActions: 'always' });

export class RootStore {
  hairSalonStore: HairSalonStore;
  userStore: UserStore;
  cityStore: CityStore;
  commonStore: CommonStore;
  countryStore: CountryStore;
  reviewStore: ReviewStore;
  roleStore: RoleStore;
  workingHourStore: WorkingHourStore;
  reservationStore: ReservationStore;
  serviceStore: ServiceStore;

  constructor() {
    this.hairSalonStore = new HairSalonStore(this);
    this.userStore = new UserStore(this);
    this.cityStore = new CityStore(this);
    this.commonStore = new CommonStore(this);
    this.countryStore = new CountryStore(this);
    this.reviewStore = new ReviewStore(this);
    this.roleStore = new RoleStore(this);
    this.workingHourStore = new WorkingHourStore(this);
    this.reservationStore = new ReservationStore(this);
    this.serviceStore = new ServiceStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
