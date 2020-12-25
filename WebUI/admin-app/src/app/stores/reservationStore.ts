import { RootStore } from './rootStore';
import { observable, action, runInAction } from 'mobx';
import { IReservation } from '../models/reservation';
import agent from '../api/agent';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { IFreeTerm } from '../models/freeTerm';

export default class ReservationStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable reservationsRegistry = new Map();
  @observable freeTermsRegistry: IFreeTerm[] = [];
  @observable freeDates: string[] = [];
  @observable freeHours: string[] = [];
  @observable loading = false;
  @observable submitting = false;
  @observable submittingDelete = false;
  @observable error: AxiosResponse | null = null;
  @observable target = '';

  @action loadReservations = async () => {
    this.loading = true;
    try {
      const { reservations } = await agent.Reservations.list();
      runInAction(() => {
        reservations.forEach((res: IReservation) => {
          this.reservationsRegistry.set(res.id, res);
        });
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  @action createReservation = async (reservation: IReservation) => {
    this.submitting = true;
    try {
      reservation.id = await agent.Reservations.create(reservation);
      runInAction(() => {
        this.freeTermsRegistry.length = 0;
        this.emptyFreeDates();
        this.emptyFreeHours();
        this.submitting = false;
        this.error = null;
      });
      toast.success('Rezervacija kreirana');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action approveReservation = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.title;
    const reservation: IReservation = this.getReservation(id);
    reservation.statusId = 2;
    reservation.status.id = 2;
    reservation.status.status = 'accepted';
    try {
      await agent.Reservations.approve(reservation);
      runInAction(() => {
        this.reservationsRegistry.set(reservation.id, reservation);
        this.submitting = false;
        this.target = '';
      });
      toast.success('Rezervacija odobrena');
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };

  @action getReservation = (id: number) => {
    return this.reservationsRegistry.get(id);
  };

  @action deleteReservation = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => {
    this.submittingDelete = true;
    this.target = e.currentTarget.title;
    try {
      await agent.Reservations.delete(id);
      runInAction(() => {
        this.reservationsRegistry.delete(id);
        this.submittingDelete = false;
        this.target = '';
      });
      toast.warn('Rezervacija izbrisana');
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.submittingDelete = false;
        this.target = '';
      });
      toast.error(error.data.error);
      console.log(error);
    }
  };

  @action loadFreeTerms = async (id: number) => {
    this.loading = true;
    try {
      const { freeTerms } = await agent.Reservations.getFreeTerms(id);
      runInAction(() => {
        freeTerms.forEach((ft: IFreeTerm) => {
          this.freeTermsRegistry.push(ft);
          this.freeDates.push(ft.date.toString());
        });
        this.freeDates = Array.from(new Set(this.freeDates));
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  @action getFreeTermHoursForDate = (date: string) => {
    this.freeTermsRegistry.forEach((ft) => {
      runInAction(() => {
        if (ft.date.toString() === date) {
          this.freeHours.push(ft.startTime);
        }
      });
    });
  };

  @action emptyFreeHours = () => {
    runInAction(() => {
      this.freeHours.length = 0;
    });
  };

  @action emptyFreeDates = () => {
    runInAction(() => {
      this.freeDates.length = 0;
    });
  };
}
