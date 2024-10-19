export interface ITicketMessageApiResponse {
  success: boolean;
  data: ITicketMessageModel[];
}

export interface ITicketMessageModel {
  id: number;
  ticket_id: number;
  user_id: number;
  content: string;
}

export class TicketMessageModel implements ITicketMessageModel {
  constructor(
    public id: number = 0,
    public ticket_id: number = 0,
    public user_id: number = 0,
    public content: string = '',
  ) {
  }
}
