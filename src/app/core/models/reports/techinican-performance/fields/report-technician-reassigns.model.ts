export interface IReportTechnicianReassingsModelResponse {
    success: boolean;
    data: IReportTechnicianReassignsModel;
}

export interface IReportTechnicianReassignsModel {
    assigned: number;
    reassigned: number;
}

export class ReportTechnicianReassignsModel implements IReportTechnicianReassignsModel {
    constructor(
        public assigned: number = 0,
        public reassigned: number = 0,
    ) {
    }
}