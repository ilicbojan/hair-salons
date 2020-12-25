export interface ICitiesVm {
  cities: ICity[];
  citiesCount: number;
}

export interface ICity {
  id: number;
  name: string;
  country: ICountry;
}

interface ICountry {
  id: number;
  name: string;
}
