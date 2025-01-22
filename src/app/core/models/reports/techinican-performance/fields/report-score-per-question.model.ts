export interface IReportTechnicianScorePerQuestionResponse {
    success: boolean;
    data: IReportTechnicianScorePerQuestion[];
}

export interface IReportTechnicianScorePerQuestion {
    question_id: number;
    question: string;
    average_score: number;
}

export class ReportTechnicianScorePerQuestion implements IReportTechnicianScorePerQuestion {
    constructor(
        public question_id: number = 0,
        public question: string = '',
        public average_score: number = 0
    ) {
    }
}