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
  Client = 'client',
  Completed = 'Completed',
}

export interface IUserModel {
  id: number;
  name: string;
  lastname: string;
  email: string;
  company_id: number;
  role: string
  company_name: string;
}

export class UserModel implements IUserModel {
  constructor(
    public id: number = 0,
    public name: string = '',
    public lastname: string = '',
    public email: string = '',
    public company_id: number = 0,
    public role: string = '',
    public company_name: string = '',
  ) {
  }
}
