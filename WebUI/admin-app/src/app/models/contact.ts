export interface IContactsVm {
  contacts: IContact[];
}

export interface IContact {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  package: string;
  message: string;
}
