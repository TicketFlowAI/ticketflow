export interface IReportTicketComplaxityModelResponse {
    success: boolean;
    data: IReportTicketComplexityModel[];
}

export interface IReportTicketComplexityModel {
    complexity: number;
    count: number;
}

export class ReportTicketComplexityModel implements IReportTicketComplexityModel {
    constructor(
        public complexity: number = 0,
        public count: number = 0,
    ) {
    }
}