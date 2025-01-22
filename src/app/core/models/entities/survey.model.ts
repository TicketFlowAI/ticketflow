export interface ISurveysApiResponse {
    success: boolean;
    data: ISurveyModel[];
}

export interface ISurveyApiResponse {
    success: boolean;
    data: ISurveyModel;
}

export interface ISurveyAnswersApiResponse {
    success: boolean;
    data: ISurveyAnswerModel[];
}

export interface ISurveyModel {
    SurveyAnswers: ISurveyAnswerModel[];
}

export class SurveyModel implements ISurveyModel {
    constructor(
        public SurveyAnswers: SurveyAnswerModel[] = []
    ) { }
}

export class SurveyAnswerModel implements ISurveyAnswerModel {
    constructor(
        public ticket_id: number = 0,
        public user_id: number = 0,
        public user_name: string = "",
        public user_lastname: string = "",
        public question_id: number = 0,
        public question: string = "",
        public score: number = 0,
    ) { }
}

export interface ISurveyAnswerModel {
    ticket_id: number;
    user_id: number;
    user_name: string;
    user_lastname: string;
    question_id: number;
    question: string;
    score: number;
}

