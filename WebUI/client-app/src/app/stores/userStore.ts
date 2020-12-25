import { AxiosResponse } from 'axios';
import { action, computed, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import {
  ICurrentUser,
  IUser,
  IUserFormValues,
  IUserRegisterFormValues,
} from '../models/user';
import { RootStore } from './rootStore';
import { history } from '../..';

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable userRegistry = new Map();
  @observable user: ICurrentUser | null = null;
  @observable profile: IUser | null = null;
  @observable loadingUsers = true;
  @observable submitting = false;
  @observable error: AxiosResponse | null = null;

  @computed get isLoggedIn() {
    return this.rootStore.commonStore.token || !!this.user;
  }

  @computed get isClient() {
    return this.user?.isClient;
  }

  @action login = async (values: IUserFormValues) => {
    this.submitting = true;
    try {
      const user = await agent.Users.login(values);
      runInAction(() => {
        this.user = user;
        this.submitting = false;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      toast.success('Dobro došli, ' + user.username);
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action register = async (values: IUserRegisterFormValues) => {
    this.submitting = true;
    try {
      if (values.password === values.confirmPassword) {
        const user = await agent.Users.register(values);
        runInAction(() => {
          this.user = user;
          this.submitting = false;
        });
        this.rootStore.commonStore.setToken(user.token);
        this.rootStore.modalStore.closeModal();
        toast.success('Dobro došli, ' + user.username);
      } else {
        toast.error('Password i potvrdjeni password nisu isti');
      }
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action currentUser = async () => {
    try {
      const user = await agent.Users.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
      });
      console.log(error);
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.rootStore.hairSalonStore.myHairSalon = null;
    this.user = null;
    toast.info('Uspesno ste se odjavili');
    history.push('/');
  };

  @action loadUsers = async () => {
    this.loadingUsers = true;
    try {
      const usersVm = await agent.Users.list();
      const { users } = usersVm;
      runInAction(() => {
        users.forEach((user) => {
          this.userRegistry.set(user.id, user);
        });
        this.loadingUsers = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingUsers = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action loadUser = async (id: string) => {
    this.loadingUsers = true;
    try {
      await agent.Users.details(id);
    } catch (error) {
      runInAction(() => {
        this.loadingUsers = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action updateUser = async (user: IUser) => {
    this.submitting = true;
    try {
      await agent.Users.update(user);
      runInAction(() => {
        this.userRegistry.set(user.id, user);
        this.user!.username = user.username;
        this.submitting = false;
      });
      toast.info('Uspesno izmenjen profil');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };
}
