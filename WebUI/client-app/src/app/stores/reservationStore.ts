import { AxiosResponse } from 'axios';
import { action, computed, observable, runInAction, reaction } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { getNextDates } from '../common/util/util';
import { IFreeTerm, IReservation, ITermByDate } from '../models/reservation';
import { RootStore } from './rootStore';

const LIMIT = 10;

export default class ReservationStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.page = 0;
        this.reservationRegistry.clear();
        this.loadReservations();
      }
    );
  }

  @observable reservationRegistry = new Map();
  @observable freeTerms: IFreeTerm[] = [];
  @observable termsByDate: ITermByDate[] = [];
  @observable nextDates: Date[] = [];
  @observable loadingReservations = false;
  @observable loadingFreeTerms = false;
  @observable loadingTerms = false;
  @observable submitting = false;
  @observable submittingDelete = false;
  @observable created = false;
  @observable error: AxiosResponse | null = null;
  @observable target = '';
  @observable reservationCount = 0;
  @observable page = 0;
  @observable predicate = new Map();

  @computed get reservations() {
    return Array.from(this.reservationRegistry.values());
  }

  @computed get totalPages() {
    return Math.ceil(this.reservationCount / LIMIT);
  }

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append('limit', String(LIMIT));
    params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });

    return params;
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  @action setPredicate = (predicate: string, value: string) => {
    this.predicate.clear();
    this.predicate.set(predicate, value);
  };

  @action loadReservations = async () => {
    this.loadingReservations = true;
    try {
      const reservationsVm = await agent.Reservations.list(this.axiosParams);
      const { reservations, reservationsCount } = reservationsVm;
      runInAction(() => {
        this.reservationRegistry.clear();
        reservations.forEach((reservation) => {
          reservation.date = new Date(reservation.date);
          this.reservationRegistry.set(reservation.id, reservation);
        });
        this.reservationCount = reservationsCount;
        this.loadingReservations = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingReservations = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action loadFreeTerms = async (id: number) => {
    this.loadingFreeTerms = true;
    try {
      const freeTermsVm = await agent.Reservations.freeTerms(id);
      const { freeTerms } = freeTermsVm;
      runInAction(() => {
        freeTerms.forEach((freeTerm) => {
          this.freeTerms.push(freeTerm);
        });
        this.loadingFreeTerms = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingFreeTerms = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action loadTerms = async (id: number) => {
    this.loadingTerms = true;
    try {
      const termsVm = await agent.Reservations.terms(id);
      const { termsByDate } = termsVm;
      runInAction(() => {
        this.termsByDate = [];
        termsByDate.forEach((term) => {
          term.date = new Date(term.date);
          this.termsByDate.push(term);
        });
        this.loadingTerms = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingTerms = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action createReservation = async (
    reservation: IReservation,
    termDate: Date
  ) => {
    this.submitting = true;
    this.created = false;
    try {
      reservation.id = await agent.Reservations.create(reservation);
      runInAction(() => {
        //this.loadTerms(reservation.hairSalonId);
        const index = this.termsByDate.findIndex((x) => x.date === termDate);
        const i = this.termsByDate[index].terms.findIndex(
          (x) => x.startTime === reservation.startTime
        );
        this.termsByDate[index].terms[i].status = 'pending';
        this.submitting = false;
        this.created = true;
        this.error = null;
      });
      this.rootStore.modalStore.closeModal();
      toast.success('Uspešno ste kreirali rezervaciju');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action approveReservation = async (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.submitting = true;
    this.target = e.currentTarget.name;
    const reservation = this.getReservation(id);
    try {
      await agent.Reservations.approve(reservation);
      runInAction(() => {
        this.reservationRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
      this.rootStore.modalStore.closeModal();
      toast.success('Uspešno ste odobrili rezervaciju');
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };

  @action getReservation = (id: number): IReservation => {
    return this.reservationRegistry.get(id);
  };

  @action deleteReservation = async (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.submittingDelete = true;
    this.target = e.currentTarget.name;
    try {
      await agent.Reservations.delete(id);
      runInAction(() => {
        this.reservationRegistry.delete(id);
        this.submittingDelete = false;
        this.target = '';
      });
      this.rootStore.modalStore.closeModal();
      toast.warning('Uspešno ste izbrisali rezervaciju');
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

  @action loadNext7Dates = () => {
    this.nextDates = getNextDates(7);
  };
}
