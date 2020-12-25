export interface IReservationsListVm {
  reservations: IReservation[];
  reservationCount: number;
}

export interface IReservation {
  id: number;
  startTime: string;
  endTime: string;
  date: Date;
  price: number;
  hairSalonId: number;
  hairSalon: IHairSalon;
  userId: string;
  user: IUser;
  statusId: number;
  status: IReservationStatus;
}

interface IHairSalon {
  id: number;
  name: string;
}

interface IUser {
  id: string;
  username: string;
}

interface IReservationStatus {
  id: number;
  status: string;
}
