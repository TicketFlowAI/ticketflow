export interface IReportTechnicianWeeklyComparisonModelResponse {
    success: boolean;
    data: IReportTechnicianWeeklyComparisonModel;
}

export interface IReportTechnicianWeeklyComparisonModel {
    current_week: number;
    previous_week: number;
}

export class ReportTechnicianWeeklyComparisonModel implements IReportTechnicianWeeklyComparisonModel {
    constructor(
        public current_week: number = 0,
        public previous_week: number = 0,
    ) {
    }
}