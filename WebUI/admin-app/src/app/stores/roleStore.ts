import { RootStore } from './rootStore';
import { observable, action, runInAction, toJS } from 'mobx';
import { IRole } from '../models/role';
import { AxiosResponse } from 'axios';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';

export default class RoleStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable rolesRegistry = new Map();
  @observable role: IRole | null = null;
  @observable loadingRoles = false;
  @observable submitting = false;
  @observable submittingDelete = false;
  @observable target = '';
  @observable error: AxiosResponse | null = null;

  @action loadRoles = async () => {
    this.loadingRoles = true;
    try {
      const rolesVm = await agent.Roles.list();
      const { roles } = rolesVm;
      runInAction(() => {
        roles.forEach((role) => {
          this.rolesRegistry.set(role.id, role);
          this.loadingRoles = false;
        });
      });
    } catch (error) {
      runInAction(() => {
        this.loadingRoles = false;
      });
      console.log(error);
    }
  };

  @action loadRole = async (id: string) => {
    let role = this.getRole(id);
    if (role) {
      this.role = role;
      return toJS(role);
    } else {
      this.loadingRoles = true;
      try {
        role = await agent.Roles.details(id);
        runInAction(() => {
          this.role = role;
          this.rolesRegistry.set(role.id, role);
          this.loadingRoles = false;
        });
        return role;
      } catch (error) {
        runInAction(() => {
          this.loadingRoles = false;
        });
        console.log(error);
      }
    }
  };

  @action getRole = (id: string) => {
    return this.rolesRegistry.get(id);
  };

  @action createRole = async (role: IRole) => {
    this.submitting = true;
    try {
      role.id = await agent.Roles.create(role);
      runInAction(() => {
        this.rolesRegistry.set(role.id, role);
        this.submitting = false;
        this.error = null;
      });
      history.push(`/roles/${role.id}`);
      toast.success('Role created');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action editRole = async (role: IRole) => {
    this.submitting = true;
    try {
      await agent.Roles.update(role);
      runInAction(() => {
        this.role = role;
        this.rolesRegistry.set(role.id, role);
        this.error = null;
        this.submitting = false;
      });
      toast.success('Role updated');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action deleteRole = async (
    id: string,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    this.submittingDelete = true;
    this.target = event.currentTarget.title;
    try {
      await agent.Roles.delete(id);
      runInAction(() => {
        this.rolesRegistry.delete(id);
        this.submittingDelete = false;
        this.target = '';
      });
    } catch (error) {
      runInAction(() => {
        this.submittingDelete = false;
        this.target = '';
      });
      console.log(error);
    }
  };
}
