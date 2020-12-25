export interface IUsersVm {
  users: IUser[];
  usersCount: number;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  isVerified: boolean;
  roles: string[];
}

export interface ICurrentUser extends IUser {
  token: string;
  isClient: boolean;
}

export interface IUserFormValues {
  email: string;
  password: string;
}

export interface IUserRegisterFormValues {
  email: string;
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
