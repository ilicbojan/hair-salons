import { RootStore } from './rootStore';
import { observable, action, runInAction, toJS } from 'mobx';
import { ICountry } from '../models/country';
import { AxiosResponse } from 'axios';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';

export default class CountryStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable countriesRegistry = new Map();
  @observable country: ICountry | null = null;
  @observable loadingCountries = false;
  @observable submitting = false;
  @observable submittingDelete = false;
  @observable error: AxiosResponse | null = null;
  @observable target = '';

  @action loadCountries = async () => {
    this.loadingCountries = true;
    try {
      const countriesVm = await agent.Countries.list();
      const { countries } = countriesVm;
      runInAction(() => {
        countries.forEach((country) => {
          this.countriesRegistry.set(country.id, country);
        });
        this.loadingCountries = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingCountries = false;
      });
      console.log(error);
    }
  };

  @action loadCountry = async (id: number) => {
    let country = this.getCountry(id);
    if (country) {
      this.country = country;
      return toJS(country);
    } else {
      this.loadingCountries = true;
      try {
        country = await agent.Countries.details(id);
        runInAction(() => {
          this.country = country;
          this.countriesRegistry.set(country.id, country);
          this.loadingCountries = false;
        });
        return country;
      } catch (error) {
        runInAction(() => {
          this.loadingCountries = false;
        });
        console.log(error);
      }
    }
  };

  @action getCountry = (id: number) => {
    return this.countriesRegistry.get(id);
  };

  @action createCountry = async (country: ICountry) => {
    this.submitting = true;
    try {
      country.id = await agent.Countries.create(country);
      runInAction(() => {
        this.countriesRegistry.set(country.id, country);
        this.submitting = false;
        this.error = null;
      });
      history.push(`/countries/${country.id}`);
      toast.success('Country created');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action editCountry = async (country: ICountry) => {
    this.submitting = true;
    try {
      await agent.Countries.update(country);
      runInAction(() => {
        this.country = country;
        this.countriesRegistry.set(country.id, country);
        this.submitting = false;
        this.error = null;
      });
      toast.success('Country updated');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action deleteCountry = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => {
    this.submittingDelete = true;
    this.target = event.currentTarget.title;
    try {
      await agent.Countries.delete(id);
      runInAction(() => {
        this.countriesRegistry.delete(id);
        this.target = '';
        this.submittingDelete = false;
      });
      toast.success('Country deleted');
    } catch (error) {
      runInAction(() => {
        this.target = '';
        this.submittingDelete = false;
      });
      console.log(error);
    }
  };
}
