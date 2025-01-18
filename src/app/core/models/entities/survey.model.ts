export interface ISurveysApiResponse {
    success: boolean;
    data: ISurvey[];
}

export interface ISurveyApiResponse {
    success: boolean;
    data: ISurvey;
}

export interface ISurvey {
    ISurveyAnswers: ISurveyAnswer[];
}

export class Survey implements ISurvey {
    constructor(
        public id: number = 0,
        public question: string = '',
        public ISurveyAnswers: ISurveyAnswer[] = []
    ) { }
}

interface ISurveyAnswer {
    ticket_id: number;
    user_name: string;
    user_lastname: string;
    question: string;
    score: number;
}

