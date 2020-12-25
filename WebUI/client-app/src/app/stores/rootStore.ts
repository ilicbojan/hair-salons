import { configure } from 'mobx';
import { createContext } from 'react';
import CityStore from './cityStore';
import CommonStore from './commonStore';
import ContactStore from './contactStore';
import CountryStore from './countryStore';
import FavouriteStore from './favouriteStore';
import ImageStore from './imageStore';
import ModalStore from './modalStore';
import ReservationStore from './reservationStore';
import ReviewStore from './reviewStore';
import HairSalonStore from './hairSalonStore';
import UserStore from './userStore';
import WorkingHourStore from './workingHourStore';
import ServiceStore from './serviceStore';

configure({ enforceActions: 'always' });

export class RootStore {
  cityStore: CityStore;
  commonStore: CommonStore;
  contactStore: ContactStore;
  countryStore: CountryStore;
  favouriteStore: FavouriteStore;
  imageStore: ImageStore;
  modalStore: ModalStore;
  reservationStore: ReservationStore;
  reviewStore: ReviewStore;
  hairSalonStore: HairSalonStore;
  userStore: UserStore;
  workingHourStore: WorkingHourStore;
  serviceStore: ServiceStore;

  constructor() {
    this.cityStore = new CityStore(this);
    this.commonStore = new CommonStore(this);
    this.contactStore = new ContactStore(this);
    this.countryStore = new CountryStore(this);
    this.favouriteStore = new FavouriteStore(this);
    this.imageStore = new ImageStore(this);
    this.modalStore = new ModalStore(this);
    this.reservationStore = new ReservationStore(this);
    this.reviewStore = new ReviewStore(this);
    this.hairSalonStore = new HairSalonStore(this);
    this.userStore = new UserStore(this);
    this.workingHourStore = new WorkingHourStore(this);
    this.serviceStore = new ServiceStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
