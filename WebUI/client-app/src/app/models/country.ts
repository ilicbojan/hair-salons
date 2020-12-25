export interface ICountriesVm {
  countries: ICountry[];
  countriesCount: number;
}

export interface ICountry {
  id: number;
  name: string;
  cities: ICity[];
  citiesCount: number;
}

interface ICity {
  id: number;
  name: string;
}
