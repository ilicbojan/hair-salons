export interface ICitiesVm {
  cities: ICity[];
}

export interface ICity {
  id: number;
  name: string;
  countryId: number;
  country: ICountry;
  hairSalons: IHairSalon[];
}

interface ICountry {
  id: number;
  name: string;
}

interface IHairSalon {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}
