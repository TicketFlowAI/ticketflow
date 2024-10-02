export interface IUserModel {
  id: number;
  name: string;
  lastname: string;
  email: string;
  company: number;
}

export class UserModel implements IUserModel {
  id: number;
  name: string;
  lastname: string;
  email: string;
  company: number;

  constructor(id: number, name: string, lastname: string, email: string, company: number) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.company = company;
  }
}
