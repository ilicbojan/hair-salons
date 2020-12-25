import { RootStore } from './rootStore';
import { observable, action, runInAction } from 'mobx';
import agent from '../api/agent';
import { AxiosResponse } from 'axios';
import { IReview } from '../models/review';
import { toast } from 'react-toastify';

export default class ReviewStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable reviewRegistry = new Map();
  @observable loadingReviews = false;
  @observable submitting = false;
  @observable error: AxiosResponse | null = null;
  @observable target = '';

  @action loadReviews = async (id: number) => {
    this.loadingReviews = true;
    try {
      const reviewsVm = await agent.Reviews.list(id);
      const { reviews } = reviewsVm;
      runInAction(() => {
        reviews.forEach((review) => {
          this.reviewRegistry.set(
            {
              key: (review.user.id, review.hairSalon.id),
            },
            review
          );
        });
        this.loadingReviews = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingReviews = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action createReview = async (id: number, review: IReview) => {
    this.submitting = true;
    try {
      review.user = this.rootStore.userStore.user!;
      review.createdAt = new Date();
      await agent.Reviews.create(id, review);
      runInAction(() => {
        this.rootStore.hairSalonStore.hairSalon?.reviews.push(review);
        this.rootStore.hairSalonStore.hairSalon!.isReviewed = true;
        this.submitting = false;
      });
      toast.success('Uspešno ste kreirali recenziju');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action updateReview = async (id: number, review: IReview) => {
    this.submitting = true;
    try {
      await agent.Reviews.update(id, review);
      runInAction(() => {
        this.submitting = false;
      });
      toast.success('Uspešno ste ažurirali recenziju');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action deleteReview = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    hairSalonId: number,
    userId: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.title;
    const review = this.getReview(hairSalonId, userId);
    try {
      await agent.Reviews.delete(hairSalonId, review);
      runInAction(() => {
        this.submitting = false;
        this.target = '';
      });
      toast.warning('Uspešno ste izbrisali recenziju');
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };

  getReview = (hairSalonId: number, userId: string) => {
    return this.reviewRegistry.get({ hairSalonId, userId });
  };
}
