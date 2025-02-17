import { IReportTechnicianScorePerQuestion, ReportTechnicianScorePerQuestion } from "../techinican-performance/fields/report-score-per-question.model";
import { IReportTicketComplexityModel, ReportTicketComplexityModel } from "./fields/report-ticket-complexity.model";
import { IReportTicketEscalationsModel, ReportTicketEscalationsModel } from "./fields/report-ticket-escalations.model";

export interface IGlobalReportModel {
    totalTicketsQty: number;
    averageTicketCloseTime: number;
    complexity: IReportTicketComplexityModel[];
    escalations: IReportTicketEscalationsModel[];
    humanInteraction: number;
    averageScorePerQuestion: IReportTechnicianScorePerQuestion[];
}

export class GlobalReportModel implements IGlobalReportModel {
    constructor(
        public totalTicketsQty: number = 0,
        public averageTicketCloseTime: number = 0,
        public complexity: ReportTicketComplexityModel[] = [],
        public escalations: ReportTicketEscalationsModel[] = [],
        public humanInteraction: number = 0,
        public averageScorePerQuestion: ReportTechnicianScorePerQuestion[] = []
    ) {
    }
}