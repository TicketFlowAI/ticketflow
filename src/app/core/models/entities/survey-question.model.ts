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
    status: number
}

export class SurveyQuestionModel implements ISurveyQuestionModel {
    constructor(
        public id: number = 0,
        public question: string = '',
        public status: number = 0,
    ) { }
}

