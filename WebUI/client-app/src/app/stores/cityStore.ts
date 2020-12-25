import { AxiosResponse } from 'axios';
import { action, computed, observable, runInAction } from 'mobx';
import agent from '../api/agent';
import { ICitiesVm } from '../models/city';
import { RootStore } from './rootStore';

export default class CityStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable cityRegistry = new Map();
  @observable loadingCities = false;
  @observable error: AxiosResponse | null = null;

  @computed get cities() {
    return Array.from(this.cityRegistry.values());
  }

  @action loadCities = async () => {
    this.loadingCities = true;
    try {
      const citiesVm: ICitiesVm = await agent.Cities.list();
      const { cities } = citiesVm;
      runInAction(() => {
        cities.forEach((city) => {
          this.cityRegistry.set(city.id, city);
          this.loadingCities = false;
        });
      });
    } catch (error) {
      runInAction(() => {
        this.loadingCities = false;
        this.error = error;
      });
      console.log(error);
    }
  };
}
