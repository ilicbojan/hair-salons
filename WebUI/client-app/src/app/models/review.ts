export interface IReviewsVm {
  reviews: IReview[];
  reviewsCount: number;
}

export interface IReview {
  user: IUser;
  hairSalon: IHairSalon;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface IUser {
  id: string;
  username: string;
}

interface IHairSalon {
  id: number;
  name: string;
}
