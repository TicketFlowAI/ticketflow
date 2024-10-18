export interface ITicketModel {
  id: number;
  company_id: number;
  service_id: number;
  title: string;
  user_id: number;
}

export class TicketModel implements ITicketModel {
  constructor(
    public id: number = 0,
    public company_id: number = 0,
    public service_id: number = 0,
    public title: string = '',
    public user_id: number = 0,
  ) {
  }
}
