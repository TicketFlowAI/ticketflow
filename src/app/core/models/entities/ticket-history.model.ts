  export interface ITicketHistoryApiResponse {
    success: boolean;
    data: ITicketHistoryModel[];
  }
  
  export interface ITicketHistoryModel {
    id: number;
    action: string;
    created_at: string;
  }
  
  export class TicketHistoryModel implements ITicketHistoryModel {
    constructor(
      public id: number = 0,
      public action: string = '',
      public created_at: string = '',
    ) {
    }
  }
  