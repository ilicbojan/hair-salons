import { AxiosResponse } from 'axios';
import { action, computed, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { IHairSalon } from '../models/hairSalon';
import { RootStore } from './rootStore';

export default class FavouriteStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable favouriteRegistry = new Map();
  @observable loadingFavourites = false;
  @observable submitting = false;
  @observable error: AxiosResponse | null = null;

  @computed get favourites() {
    return Array.from(this.favouriteRegistry.values());
  }

  @action loadFavourites = async () => {
    this.loadingFavourites = true;
    try {
      const favouritesVm = await agent.Favourites.list();
      const { favourites } = favouritesVm;
      runInAction(() => {
        favourites.forEach((favourite) => {
          this.favouriteRegistry.set(
            favourite.hairSalon.id,
            favourite.hairSalon
          );
        });
        this.loadingFavourites = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingFavourites = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action addToFavourites = async (hairSalon: IHairSalon) => {
    this.submitting = true;
    try {
      await agent.Favourites.add(hairSalon.id!);
      runInAction(() => {
        hairSalon.isFavourite = true;
        this.rootStore.hairSalonStore.hairSalonRegistry.set(
          hairSalon.id,
          hairSalon
        );
        this.rootStore.hairSalonStore.hairSalon!.isFavourite = true;
        this.favouriteRegistry.set(hairSalon.id!, hairSalon);
        this.submitting = false;
      });
      toast.success('Usesno ste dodali teren u omiljene');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action removeFromFavourites = async (hairSalon: IHairSalon) => {
    this.submitting = true;
    try {
      await agent.Favourites.remove(hairSalon.id!);
      runInAction(() => {
        hairSalon.isFavourite = false;
        this.rootStore.hairSalonStore.hairSalonRegistry.set(
          hairSalon.id,
          hairSalon
        );
        this.rootStore.hairSalonStore.hairSalon!.isFavourite = false;
        this.favouriteRegistry.delete(hairSalon.id!);
        this.submitting = false;
      });
      toast.warning('Usesno ste izbacili teren iz omiljenih');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };
}
