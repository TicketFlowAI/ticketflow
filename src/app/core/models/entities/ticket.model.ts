export interface ITicketsApiResponse {
  success: boolean;
  data: ITicketModel[];
}

export interface ITicketApiResponse {
  success: boolean;
  data: ITicketModel;
}

export interface ITicketModel {
  id: number;
  title: string;
  priority: number;
  needsHumanInteraction: boolean;
  complexity: number;
  service_contract_id: number;
  user_id: number;
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
    public priority: number = 0,
    public needsHumanInteraction: boolean = false,
    public complexity: number = 0,
    public service_contract_id: number = 0,
    public user_id: number = 0,
    public user_name: string = '',
    public user_lastname: string = '',
    public company_id: number = 0,
    public company_name: string = '',
    public service_id: number = 0,
    public service_desc: string = ''
  ) {}
}

