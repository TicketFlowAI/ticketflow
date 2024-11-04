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
  ticket_id: number;
  content: string;
  user_id: number;
  user_name: string;
  user_lastname: string;
  user_role: string;
  timestamp: Date;
}

export class TicketMessageModel implements ITicketMessageModel {
  constructor(
    public id: number = 0,
    public ticket_id: number = 0,
    public content: string = '',
    public user_id: number = 0,
    public user_name: string = '',
    public user_lastname: string = '',
    public user_role: string = '',
    public timestamp: Date = new Date(),
  ) {
  }
}
