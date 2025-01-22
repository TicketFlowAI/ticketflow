export interface IAiClassifiersApiResponse {
  success: boolean;
  data: IAiClassifierModel[];
}

export interface IAiClassifierApiResponse {
  success: boolean;
  data: IAiClassifierModel;
}

export interface IAiClassifierModel {
  ClassifierName: string;
  ClassifierArn: string;
  VersionName: string;
  Status: string;
  LanguageCode: string;
  SubmitTime: string;
  EndTime: string;
  NumberOfLabels: number;
  Accuracy: number;
  F1Score: number;
  Precision: number;
  Recall: number;
}

export class AiClassifierModel implements IAiClassifierModel {
  constructor(
    public ClassifierName: string = '',
    public ClassifierArn: string = '',
    public VersionName: string = '',
    public Status: string = '',
    public LanguageCode: string = '',
    public SubmitTime: string = '',
    public EndTime: string = '',
    public NumberOfLabels: number = 0,
    public Accuracy: number = 0,
    public F1Score: number = 0,
    public Precision: number = 0,
    public Recall: number = 0
  ) {}
}



