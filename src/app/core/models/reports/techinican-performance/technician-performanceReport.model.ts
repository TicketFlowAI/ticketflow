import { IReportTechnicianScorePerQuestion, ReportTechnicianScorePerQuestion } from "./fields/report-score-per-question.model";
import { IReportTechnicianReassignsModel, ReportTechnicianReassignsModel } from "./fields/report-technician-reassigns.model";
import { IReportTechnicianWeeklyComparisonModel, ReportTechnicianWeeklyComparisonModel } from "./fields/report-technician-weekly-comparison.model";

export interface ITechnicianPerformanceReportModel {
    totalTicketsSolved: number;
    averageTicketSolveTime: number;
    assignedReassigned: IReportTechnicianReassignsModel;
    currentTickets: number;
    weeklyComparison: IReportTechnicianWeeklyComparisonModel;
    averageScoreQuestions: number;
    averageScorePerQuestion: IReportTechnicianScorePerQuestion[];
}

export class TechnicianPerformanceReportModel implements ITechnicianPerformanceReportModel {
    constructor(
        public totalTicketsSolved: number = 0,
        public averageTicketSolveTime: number = 0,
        public assignedReassigned: ReportTechnicianReassignsModel = new ReportTechnicianReassignsModel(),
        public currentTickets: number = 0,
        public weeklyComparison: ReportTechnicianWeeklyComparisonModel = new ReportTechnicianWeeklyComparisonModel(),
        public averageScoreQuestions: number = 0,
        public averageScorePerQuestion: ReportTechnicianScorePerQuestion[] = []
    ) {
    }
}