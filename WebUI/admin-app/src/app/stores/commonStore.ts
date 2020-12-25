import { RootStore } from './rootStore';
import { observable, action, reaction, runInAction } from 'mobx';
import agent from '../api/agent';

export default class CommonStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      }
    );
  }

  @observable token: string | null = window.localStorage.getItem('jwt');
  @observable appLoaded = false;
  @observable contactRegistry = new Map();
  @observable loadingContacts = false;

  @action setToken = (token: string | null) => {
    this.token = token;
  };

  @action setAppLoaded = () => {
    this.appLoaded = true;
  };

  @action loadContacts = async () => {
    this.loadingContacts = true;
    try {
      const contactsVm = await agent.Contacts.list();
      const { contacts } = contactsVm;
      runInAction(() => {
        contacts.forEach((contact) => {
          this.contactRegistry.set(contact.id, contact);
        });
        this.loadingContacts = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingContacts = false;
      });
      console.log(error);
    }
  };
}
