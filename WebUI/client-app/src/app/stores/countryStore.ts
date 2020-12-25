import { AxiosResponse } from 'axios';
import { action, computed, observable, runInAction } from 'mobx';
import agent from '../api/agent';
import { RootStore } from './rootStore';

export default class CountryStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable countryRegistry = new Map();
  @observable loadingCountries = false;
  @observable error: AxiosResponse | null = null;

  @computed get countries() {
    return Array.from(this.countryRegistry.values());
  }

  @action loadCountries = async () => {
    this.loadingCountries = true;
    try {
      const countriesVm = await agent.Countries.list();
      const { countries } = countriesVm;
      runInAction(() => {
        countries.forEach((country) => {
          this.countryRegistry.set(country.id, country);
          this.loadingCountries = false;
        });
      });
    } catch (error) {
      runInAction(() => {
        this.loadingCountries = false;
        this.error = error;
      });
      console.log(error);
    }
  };
}
