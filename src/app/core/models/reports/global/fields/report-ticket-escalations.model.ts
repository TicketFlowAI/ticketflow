export interface IReportTicketEscalationsModelResponse {
    success: boolean;
    data: IReportTicketEscalationsModel[];
}

export interface IReportTicketEscalationsModel {
    ticket_id: number;
    technicians_count: number;
}

export class ReportTicketEscalationsModel implements IReportTicketEscalationsModel {
    constructor(
        public ticket_id: number = 0,
        public technicians_count: number = 0,
    ) {
    }
}