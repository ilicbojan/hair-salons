import { AxiosResponse } from 'axios';
import { action, computed, observable, reaction, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { history } from '../..';
import agent from '../api/agent';
import { IHairSalon } from '../models/hairSalon';
import { RootStore } from './rootStore';

export default class HairSalonStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.hairSalonRegistry.clear();
        this.loadHairSalons();
      }
    );
  }

  @observable hairSalonRegistry = new Map();
  @observable featuredHairSalons: IHairSalon[] = [];
  @observable hairSalon: IHairSalon | null = null;
  @observable myHairSalon: IHairSalon | null = null;
  @observable loadingHairSalons = false;
  @observable loadingMyHairSalon = false;
  @observable submitting = false;
  @observable error: AxiosResponse | null = null;
  @observable predicate = new Map();

  @computed get hairSalons() {
    return Array.from(this.hairSalonRegistry.values());
  }

  @computed get workingHours() {
    const openTimes: number[] = [];
    this.hairSalon?.workingHours.forEach((wh) => {
      openTimes.push(Number(wh.openTime.substring(0, 2)));
    });
    const minTime = Math.min(...openTimes);

    const closeTimes: number[] = [];
    this.hairSalon?.workingHours.forEach((wh) => {
      closeTimes.push(Number(wh.closeTime.substring(0, 2)));
    });
    var maxTime = Math.min(...closeTimes);
    if (maxTime === 0) {
      maxTime = 23;
    } else {
      maxTime = Math.max(...closeTimes);
    }

    var workingHours: string[] = [];
    for (var i = minTime; i < maxTime; i++) {
      if (i < 10) {
        workingHours.push('0' + i + ':00:00');
        workingHours.push('0' + i + ':30:00');
      } else {
        workingHours.push(i + ':00:00');
        workingHours.push(i + ':30:00');
      }
    }

    return workingHours;
  }

  @computed get axiosParams() {
    const params = new URLSearchParams();
    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });

    return params;
  }

  @action setPredicate = (predicate: string, value: string) => {
    this.predicate.clear();
    this.predicate.set(predicate, value);
    history.push('/salons');
  };

  @action setPredicates = (values: any) => {
    this.predicate.clear();
    this.predicate.set('isPayed', 'true');
    for (var key in values) {
      this.predicate.set(key, values[key]);
    }
    history.push('/salons');
  };

  @action loadHairSalons = async () => {
    this.loadingHairSalons = true;
    try {
      const hairSalonsVm = await agent.HairSalons.list(this.axiosParams);
      const { hairSalons } = hairSalonsVm;
      runInAction(() => {
        hairSalons.forEach((hairSalon) => {
          this.hairSalonRegistry.set(hairSalon.id, hairSalon);
        });
        this.loadingHairSalons = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingHairSalons = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action loadFeaturedHairSalons = async () => {
    this.loadingHairSalons = true;
    this.featuredHairSalons = [];
    try {
      const hairSalonsVm = await agent.HairSalons.featuredList();
      const { hairSalons } = hairSalonsVm;
      runInAction(() => {
        hairSalons.forEach((hairSalon) => {
          this.featuredHairSalons.push(hairSalon);
        });
        this.loadingHairSalons = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingHairSalons = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action loadHairSalon = async (id: number) => {
    let hairSalon: IHairSalon = this.getHairSalon(id);
    // if (hairSalon) {
    //   this.hairSalon = hairSalon;
    //   return toJS(hairSalon);
    // } else {
    this.loadingHairSalons = true;
    try {
      hairSalon = await agent.HairSalons.details(id);
      runInAction(() => {
        this.hairSalon = hairSalon;
        this.hairSalonRegistry.set(hairSalon.id, hairSalon);
        this.loadingHairSalons = false;
      });
      return hairSalon;
    } catch (error) {
      runInAction(() => {
        this.loadingHairSalons = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  getHairSalon = (id: number): IHairSalon => {
    return this.hairSalonRegistry.get(id);
  };

  @action loadMyHairSalon = async () => {
    this.loadingMyHairSalon = true;
    try {
      const hairSalon = await agent.HairSalons.myDetails();
      runInAction(() => {
        this.myHairSalon = hairSalon;
        this.hairSalonRegistry.set(hairSalon.id, hairSalon);
        this.loadingMyHairSalon = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingMyHairSalon = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action updateHairSalon = async (hairSalon: IHairSalon) => {
    this.submitting = true;
    try {
      await agent.HairSalons.update(hairSalon);
      runInAction('editing hair salon', () => {
        this.loadMyHairSalon();
        this.submitting = false;
      });
      toast.info('Frizeski salon je ažuriran');
    } catch (error) {
      runInAction('edit hair salon error', () => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };
}
