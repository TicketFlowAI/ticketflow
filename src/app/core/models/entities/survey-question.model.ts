export interface ISurveyQuestionsApiResponse {
    success: boolean;
    data: ISurveyQuestionModel[];
}

export interface ISurveyQuestionApiResponse {
    success: boolean;
    data: ISurveyQuestionModel;
}

export interface ISurveyQuestionModel {
    id: number;
    question: string;
    active: number
}

export class SurveyQuestionModel implements ISurveyQuestionModel {
    constructor(
        public id: number = 0,
        public question: string = '',
        public active: number = 0,
    ) { }
}

