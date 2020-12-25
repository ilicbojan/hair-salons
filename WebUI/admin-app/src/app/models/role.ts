export interface IRolesVm {
  roles: IRole[];
}

export interface IRole {
  id: string;
  name: string;
  users: IUser[];
}

interface IUser {
  id: string;
  username: string;
}
