export interface IHairSalonsVm {
  hairSalons: IHairSalon[];
  hairSalonsCount: number;
}

export interface IHairSalon {
  id?: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  description: string;
  isPayed: boolean;
  isPremium: boolean;
  isFavourite: boolean;
  isReviewed: boolean;
  city: ICity;
  image: IImage;
  workingHours: IWorkingHour[];
  reviews: IReview[];
  images: IImage[];
  services: IService[];
}

interface ICity {
  id: number;
  name: string;
}

interface IWorkingHour {
  id: number;
  day: number;
  openTime: string;
  closeTime: string;
}

interface IReview {
  user: IUser;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface IUser {
  id: string;
  username: string;
}

interface IImage {
  id: string;
  url: string;
  isMain: boolean;
}

interface IService {
  id: number;
  name: string;
  price: number;
}
