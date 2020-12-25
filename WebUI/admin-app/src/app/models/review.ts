export interface IReviewsVm {
  reviews: IReview[];
  reviewsCount: number;
}

export interface IReview {
  username: string;
  hairSalon: IHairSalon;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface IHairSalon {
  id: number;
  name: string;
}
