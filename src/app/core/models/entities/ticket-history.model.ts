  export interface ITicketHistoryApiResponse {
    success: boolean;
    data: ITicketHistoryModel[];
  }
  
  export interface ITicketHistoryModel {
    id: number;
    ticket_id: number;
    user_id: number;
    action: string;
  }
  
  export class TicketHistoryModel implements ITicketHistoryModel {
    constructor(
      public id: number = 0,
      public ticket_id: number = 0,
      public user_id: number = 0,
      public action: string = '',
    ) {
    }
  }
  