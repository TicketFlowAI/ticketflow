export interface ICompanyApiResponse {
  success: boolean;
  data: ICompanyModel[];
}

export interface ICompanyModel {
  id: number;
  name: string;
  idNumber: string;
  contactEmail: string;
  phone: string;
  state: string;
  city: string;
  address: string;
}

export class CompanyModel implements ICompanyModel {
  constructor(
    public id: number = 0,
    public name: string = '',
    public idNumber: string = '',
    public contactEmail: string = '',
    public phone: string = '',
    public state: string = '',
    public city: string = '',
    public address: string = ''
  ) {
  }
}
