import { RootStore } from './rootStore';
import { observable, action, runInAction } from 'mobx';
import agent from '../api/agent';

export default class ReviewStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable reviewsRegistry = new Map();
  @observable loadingReviews = false;

  @action loadReviews = async () => {
    this.loadingReviews = true;
    try {
      const reviewsVm = await agent.Reviews.list();
      const { reviews } = reviewsVm;
      runInAction(() => {
        reviews.forEach((review) => {
          this.reviewsRegistry.set(
            {
              key: (review.username, review.hairSalon.id),
            },
            review
          );
        });
        this.loadingReviews = false;
      });
      console.log(...reviews);
    } catch (error) {
      runInAction(() => {
        this.loadingReviews = false;
      });
      console.log(error);
    }
  };
}
