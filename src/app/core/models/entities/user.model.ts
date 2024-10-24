export interface IUserModelResponse {
  success: boolean;
  data: IUserModel[];
}

export interface IUserModel {
  id: number;
  name: string;
  lastname: string;
  email: string;
  company_id: number;
  deleted_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export class UserModel implements IUserModel {
  constructor(
    public id: number = 0,
    public name: string = '',
    public lastname: string = '',
    public email: string = '',
    public company_id: number = 0,
    public deleted_at: Date | null = null,
    public created_at: Date | null = null,
    public updated_at: Date | null = null,
  ) {
  }
}
