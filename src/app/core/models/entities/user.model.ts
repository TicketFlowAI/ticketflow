export interface IUsersModelResponse {
  success: boolean;
  data: IUserModel[];
}

export interface IUserModelResponse {
  success: boolean;
  data: IUserModel;
}

export enum UserRoles {
  Admin = 'super-admin',
  Technician = 'technician',
  One = '1',
  Two = '2',
  Three = '3',
  Client = 'client',
  Completed = 'Completed',
}

export interface IUserModel {
  id: number;
  name: string;
  lastname: string;
  email: string;
  company_id: number;
  role: string[] | string
  company_name: string;
  password: string;
  twoFactorEnabled: number;
}

export class UserModel implements IUserModel {
  constructor(
    public id: number = 0,
    public name: string = '',
    public lastname: string = '',
    public email: string = '',
    public company_id: number = 0,
    public role: string[] | string = [],
    public company_name: string = '',
    public password: string = '',
    public twoFactorEnabled: number = 0
  ) {
  }
}
