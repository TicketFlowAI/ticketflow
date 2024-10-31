export interface ITicketMessagesApiResponse {
  success: boolean;
  data: ITicketMessageModel[];
}

export interface ITicketMessageApiResponse {
  success: boolean;
  data: ITicketMessageModel;
}

export interface ITicketMessageModel {
  id: number;
  content: string;
  ticket_id: number;
  user_id: number;

}

export class TicketMessageModel implements ITicketMessageModel {
  constructor(
    public id: number = 0,
    public content: string = '',
    public ticket_id: number = 0,
    public user_id: number = 0,
  ) {
  }
}
