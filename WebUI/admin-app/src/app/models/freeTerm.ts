export interface IFreeTermsVm {
  hairSalonId: number;
  freeTermsCount: number;
  freeTerms: IFreeTerm[];
}

export interface IFreeTerm {
  date: Date;
  startTime: string;
  price: number;
}
