export interface ISurveyQuestionsApiResponse {
    success: boolean;
    data: ISurveryQuestionModel[];
}

export interface ISurveyQuestionApiResponse {
    success: boolean;
    data: ISurveryQuestionModel;
}

export interface ISurveryQuestionModel {
    id: number;
    question: string;
}

export class SurveryQuestionModel implements ISurveryQuestionModel {
    constructor(
        public id: number = 0,
        public question: string = '',
    ) { }
}

