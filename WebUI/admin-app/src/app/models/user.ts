export interface IUsersVm {
  users: IUser[];
}

export interface IUser {
  token: string;
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  roles: string[];
}

export interface IUserFormValues {
  email: string;
  password: string;
  id?: string;
  username?: string;
  role?: string;
}
