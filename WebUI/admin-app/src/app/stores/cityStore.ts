import { RootStore } from './rootStore';
import { observable, action, runInAction, toJS } from 'mobx';
import { ICity } from '../models/city';
import agent from '../api/agent';
import { AxiosResponse } from 'axios';
import { history } from '../..';
import { toast } from 'react-toastify';

export default class CityStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable citiesRegistry = new Map();
  @observable city: ICity | null = null;
  @observable loadingCities = false;
  @observable submitting = false;
  @observable submittingDelete = false;
  @observable error: AxiosResponse | null = null;
  @observable target = '';

  @action loadCities = async () => {
    this.loadingCities = true;
    try {
      const citiesVm = await agent.Cities.list();
      const { cities } = citiesVm;
      runInAction('loading cities', () => {
        cities.forEach((city) => {
          city.countryId = city.country.id;
          this.citiesRegistry.set(city.id, city);
        });
        this.loadingCities = false;
      });
    } catch (error) {
      runInAction('loading cities error', () => {
        this.loadingCities = false;
      });
      console.log(error);
    }
  };

  @action loadCity = async (id: number) => {
    let city = this.getCity(id);
    if (city) {
      this.city = city;
      return toJS(city);
    } else {
      this.loadingCities = true;
      try {
        city = await agent.Cities.details(id);
        city.countryId = city.country.id;
        runInAction(() => {
          this.city = city;
          this.citiesRegistry.set(city.id, city);
          this.loadingCities = false;
        });
        return city;
      } catch (error) {
        runInAction(() => {
          this.loadingCities = false;
        });
        console.log(error);
      }
    }
  };

  @action getCity = (id: number) => {
    return this.citiesRegistry.get(id);
  };

  @action createCity = async (city: ICity) => {
    this.submitting = true;
    try {
      city.id = await agent.Cities.create(city);
      city.country = this.rootStore.countryStore.getCountry(city.countryId);
      runInAction(() => {
        this.citiesRegistry.set(city.id, city);
        this.submitting = false;
        this.error = null;
      });
      history.push(`/cities/${city.id}`);
      toast.success('City created');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action editCity = async (city: ICity) => {
    this.submitting = true;
    try {
      await agent.Cities.update(city);
      runInAction(() => {
        this.city = city;
        this.citiesRegistry.set(city.id, city);
        this.submitting = false;
        this.error = null;
      });
      toast.success('City updated');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action deleteCity = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => {
    this.submittingDelete = true;
    this.target = event.currentTarget.title;
    try {
      await agent.Cities.delete(id);
      runInAction(() => {
        this.citiesRegistry.delete(id);
        this.target = '';
        this.submittingDelete = false;
      });
      toast.warn('City deleted');
    } catch (error) {
      runInAction(() => {
        this.target = '';
        this.submittingDelete = false;
      });
      console.log(error);
    }
  };
}
