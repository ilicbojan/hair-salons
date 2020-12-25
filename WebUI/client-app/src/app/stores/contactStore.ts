import { AxiosResponse } from 'axios';
import { action, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { history } from '../..';
import agent from '../api/agent';
import { IContact } from '../models/contact';
import { RootStore } from './rootStore';

export default class ContactStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable submitting = false;
  @observable error: AxiosResponse | null = null;

  @action createContact = async (contact: IContact) => {
    this.submitting = true;
    try {
      await agent.Contacts.create(contact);
      runInAction(() => {
        this.submitting = false;
      });
      history.push('/partnership');
      toast.success('Zahtev za partnerstvo je uspesno poslat');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };
}
