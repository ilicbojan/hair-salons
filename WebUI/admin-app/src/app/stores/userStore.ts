import { RootStore } from './rootStore';
import { observable, computed, action, runInAction } from 'mobx';
import { IUser, IUserFormValues } from '../models/user';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;
  @observable userRegistry = new Map();
  @observable loadingUsers = false;
  @observable loadingRoles = false;
  @observable submitting = false;
  @observable target = '';
  @observable error: AxiosResponse | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
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
      history.push('/hair-salons/list');
      toast.info(`Hello ${user.username}`);
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action getUser = async () => {
    try {
      const user = await agent.Users.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push('/');
    toast.info('You are logged out');
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
      });
      console.log(error);
    }
  };

  @action createUser = async (user: IUserFormValues) => {
    this.submitting = true;
    try {
      user.id = await agent.Users.create(user);
      runInAction(() => {
        this.userRegistry.set(user.id!, user);
        this.submitting = false;
      });
      history.push('/users');
      toast.success('User created');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action deleteUser = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.title;
    try {
      await agent.Users.delete(id);
      runInAction(() => {
        this.userRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
      toast.warn('User deleted');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };
}
