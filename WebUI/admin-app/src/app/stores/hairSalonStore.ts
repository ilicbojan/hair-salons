import { observable, action, runInAction } from 'mobx';
import { RootStore } from './rootStore';
import agent from '../api/agent';
import { IHairSalon } from '../models/hairSalon';
import { toast } from 'react-toastify';
import { history } from '../..';
import { AxiosResponse } from 'axios';

export default class HairSalonStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable hairSalonsRegistry = new Map();
  @observable hairSalon: IHairSalon | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';
  @observable error: AxiosResponse | null = null;

  @action loadHairSalons = async () => {
    this.loadingInitial = true;
    try {
      const hairSalonsVm = await agent.HairSalons.list();
      const { hairSalons } = hairSalonsVm;
      runInAction('loading hair salons', () => {
        hairSalons.forEach((hairSalon) => {
          hairSalon.cityId = hairSalon.city.id;
          this.hairSalonsRegistry.set(hairSalon.id, hairSalon);
        });
        this.loadingInitial = false;
        console.log(hairSalons);
      });
    } catch (error) {
      runInAction('loading hair salons error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadHairSalon = async (id: number) => {
    // let hairSalon = this.getHairSalon(id);
    // if (hairSalon) {
    //   this.hairSalon = hairSalon;
    //   return toJS(hairSalon);
    // } else {
    this.loadingInitial = true;
    try {
      var hairSalon = await agent.HairSalons.details(id);
      hairSalon.cityId = hairSalon.city.id;
      runInAction('getting hair salon', () => {
        this.hairSalon = hairSalon;
        this.hairSalonsRegistry.set(hairSalon.id, hairSalon);
        this.loadingInitial = false;
      });
      return hairSalon;
    } catch (error) {
      runInAction('get hair salon error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  getHairSalon = (id: number) => {
    return this.hairSalonsRegistry.get(id);
  };

  @action createHairSalon = async (hairSalon: IHairSalon) => {
    this.submitting = true;
    try {
      hairSalon.id = await agent.HairSalons.create(hairSalon);
      hairSalon.city = this.rootStore.cityStore.getCity(hairSalon.cityId);
      hairSalon.reviews = [];
      hairSalon.reservations = [];
      hairSalon.services = [];
      runInAction(() => {
        this.hairSalonsRegistry.set(hairSalon.id, hairSalon);
        this.submitting = false;
      });
      history.push(`/hair-salons/details/${hairSalon.id}`);
      toast.success('Hair salon created');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action editHairSalon = async (hairSalon: IHairSalon) => {
    this.submitting = true;
    try {
      await agent.HairSalons.update(hairSalon);
      runInAction('editing hair salon', () => {
        this.loadHairSalon(hairSalon!.id!);
        this.submitting = false;
      });
      toast.success('Hair salon updated');
    } catch (error) {
      runInAction('edit hair salon error', () => {
        this.submitting = false;
        this.error = error;
      });
      toast.error('Problem editing hair salon');
      console.log(error);
    }
  };

  @action deleteHairSalon = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.title;
    try {
      await agent.HairSalons.delete(id);
      runInAction(() => {
        this.hairSalonsRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
      toast.warn('Hair salon deleted');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };
}

// export default createContext(new HairSalonStore());

// in Component: var hairSalonStore = useContext(SportOjbectStore)
// and export default observer(Component)
