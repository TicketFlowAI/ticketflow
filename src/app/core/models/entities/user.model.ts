export interface IUserModel {
  id: number;
  name: string;
  lastname: string;
  email: string;
  company: number;
}

export class UserModel implements IUserModel {
  constructor(
    public id: number = 0,
    public name: string = '',
    public lastname: string = '',
    public email: string = '',
    public company: number = 0
  ){
  }
}
