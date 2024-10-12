export interface IUserModel {
  id: number;
  name: string;
  lastname: string;
  email: string;
  email_verified_at: Date | null;
  two_factor_secret: null;
  two_factor_recovery_codes: null;
  company: number;
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
    public email_verified_at: Date | null = null,
    public two_factor_secret: null = null,
    public two_factor_recovery_codes: null = null,
    public company: number = 0,
    public deleted_at: Date | null = null,
    public created_at: Date | null = null,
    public updated_at: Date | null = null,
  ) {
  }
}
