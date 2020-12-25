import { RootStore } from './rootStore';
import { observable, action, runInAction } from 'mobx';
import agent from '../api/agent';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { IService } from '../models/service';

export default class ServiceStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable serviceRegistry = new Map();
  @observable loadingServices = false;
  @observable submitting = false;
  @observable submittingDelete = false;
  @observable error: AxiosResponse | null = null;
  @observable target = '';

  @action loadServices = async (id: number) => {
    this.loadingServices = true;
    try {
      const { services } = await agent.Services.list(id);
      runInAction(() => {
        this.serviceRegistry = new Map();
        services.forEach((service) => {
          this.serviceRegistry.set(service.id, service);
        });
        this.loadingServices = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingServices = false;
      });
      console.log(error);
    }
  };

  @action createService = async (service: IService) => {
    this.submitting = true;
    try {
      service.id = await agent.Services.create(service);
      runInAction(() => {
        this.serviceRegistry.set(service.id, service);
        this.submitting = false;
        this.error = null;
      });
      toast.success('Service created');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action deleteService = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => {
    this.submittingDelete = true;
    this.target = e.currentTarget.title;
    try {
      await agent.Services.delete(id);
      runInAction(() => {
        this.serviceRegistry.delete(id);
        this.target = '';
        this.submittingDelete = false;
      });
      toast.warn('Service deleted');
    } catch (error) {
      runInAction(() => {
        this.target = '';
        this.submittingDelete = false;
      });
      console.log(error);
    }
  };
}
