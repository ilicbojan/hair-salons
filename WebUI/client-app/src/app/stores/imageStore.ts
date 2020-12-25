import { AxiosResponse } from 'axios';
import { action, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { IImage } from '../models/image';
import { RootStore } from './rootStore';

export default class ImageStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable uploading = false;
  @observable submitting = false;
  @observable submittingDelete = false;
  @observable error: AxiosResponse | null = null;
  @observable target = '';

  @action uploadImage = async (file: Blob) => {
    this.uploading = true;
    const id = this.rootStore.hairSalonStore.myHairSalon?.id!;
    try {
      const image = await agent.Images.upload(id, file);
      runInAction(() => {
        this.rootStore.hairSalonStore.myHairSalon?.images.push(image);
        this.uploading = false;
      });
      this.rootStore.hairSalonStore.loadMyHairSalon();
      this.rootStore.modalStore.closeModal();
      toast.success('Uspešno ste dodali sliku');
    } catch (error) {
      runInAction(() => {
        this.uploading = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action setMainImage = async (
    image: IImage,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.submitting = true;
    this.target = e.currentTarget.name;
    const hairSalonId = this.rootStore.hairSalonStore.myHairSalon?.id!;
    try {
      await agent.Images.setMain(hairSalonId, image.id);
      runInAction(() => {
        this.rootStore.hairSalonStore.myHairSalon!.images.find(
          (i) => i.isMain
        )!.isMain = false;
        this.rootStore.hairSalonStore.myHairSalon!.images.find(
          (i) => i.id === this.target
        )!.isMain = true;
        var so = this.rootStore.hairSalonStore.getHairSalon(hairSalonId);
        var image: IImage = so.images.find((i) => i.id === this.target)!;
        so.image = image;
        this.rootStore.hairSalonStore.hairSalonRegistry.set(so.id, so);
        this.submitting = false;
        this.target = '';
      });
      this.rootStore.hairSalonStore.loadMyHairSalon();
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };

  @action deleteImage = async (
    image: IImage,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.submittingDelete = true;
    this.target = e.currentTarget.name;
    const hairSalonId = this.rootStore.hairSalonStore.myHairSalon?.id!;
    try {
      await agent.Images.delete(hairSalonId, image.id);
      runInAction(() => {
        this.rootStore.hairSalonStore.myHairSalon!.images = this.rootStore.hairSalonStore.myHairSalon!.images.filter(
          (i) => i.id !== image.id
        );
        this.submittingDelete = false;
        this.target = '';
      });
      this.rootStore.hairSalonStore.loadMyHairSalon();
      this.rootStore.modalStore.closeModal();
      toast.warning('Uspešno ste izbrisali sliku');
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.submittingDelete = false;
        this.target = '';
      });
      console.log(error);
    }
  };
}
