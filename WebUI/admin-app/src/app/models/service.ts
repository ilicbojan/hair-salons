export interface IServicesVm {
  services: IService[];
}

export interface IService {
  id: number;
  name: string;
  price: number;
  hairSalonId: number;
}
