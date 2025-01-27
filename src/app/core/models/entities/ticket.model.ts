export interface ITicketsApiResponse {
  success: boolean;
  data: ITicketModel[];
}

export interface ITicketApiResponse {
  success: boolean;
  data: ITicketModel;
}

export enum TicketStatus {
  Closed = 0,
  Open = 1,
  InProgress = 2,
  PendingSurvey = 3,
}

export interface ITicketModel {
  id: number;
  title: string;
  priority: number | string;
  needsHumanInteraction: number | string;
  complexity: number | string;
  service_contract_id: number;
  user_id: number;
  status: number;
  newClientMessage: number;
  newTechnicianMessage: number;
  user_name: string;
  user_lastname: string;
  company_id: number;
  company_name: string;
  service_id: number;
  service_desc: string;
}

export class TicketModel implements ITicketModel {
  constructor(
    public id: number = 0,
    public title: string = '',
    public priority: number | string = '',
    public needsHumanInteraction: number | string = '',
    public complexity: number | string = '',
    public service_contract_id: number = 0,
    public user_id: number = 0,
    public status: number = 1,
    public newClientMessage: number = 0,
    public newTechnicianMessage: number = 0,
    public user_name: string = '',
    public user_lastname: string = '',
    public company_id: number = 0,
    public company_name: string = '',
    public service_id: number = 0,
    public service_desc: string = ''
  ) {}
}

