import { RootStore } from './rootStore';
import { observable, action } from 'mobx';

export default class ModalStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable.shallow modal = {
    open: false,
    header: null,
    body: null,
  };

  @action openModal = (header: any, body: any) => {
    this.modal.open = true;
    this.modal.header = header;
    this.modal.body = body;
  };

  @action closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
    this.modal.header = null;
  };
}
