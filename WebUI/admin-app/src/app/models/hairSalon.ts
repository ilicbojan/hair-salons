export interface IHairSalonsVm {
  hairSalons: IHairSalon[];
  hairSalonsCount: number;
}

export interface IHairSalon {
  id?: number;
  email: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  isPayed: boolean;
  isPremium: boolean;
  cityId: number;
  city: ICity;
  services: IService[];
  workingHours: IWorkingHour[];
  reviews: IReview[];
  reservations: IReservation[];
}

interface ICity {
  id: number;
  name: string;
}

interface IService {
  id: number;
  name: string;
  price: number;
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

interface IReservation {
  id: number;
  startTime: string;
  endtTime: string;
  date: Date;
  user: IUser;
  status: IReservationStatus;
}

interface IUser {
  id: string;
  username: string;
}

interface IReservationStatus {
  id: number;
  status: string;
}
