export interface IAiClassifiersApiResponse {
  success: boolean;
  data: IAiClassifierModel[];
}

export interface IAiClassifierApiResponse {
  success: boolean;
  data: IAiClassifierModel;
}

export interface IAiClassifierPerformanceResponse {
  success: boolean;
  data: IAiClassifierPerformanceModel;
}

export interface IAiClassifierModel {
  VersionArn: string;
  VersionName: string;
  Status: string;
}

export class AiClassifierModel implements IAiClassifierModel {
  constructor(
    public VersionArn: string = '',
    public VersionName: string = '',
    public Status: string = '',
  ) {
  }
}

export interface IAiClassifierPerformanceModel {
  VersionArn: string;
  Accuracy: string;
  F1Score: string;
  Precision: string;
  Recall: string;
}

export class AiClassifierPerformanceModel implements IAiClassifierPerformanceModel {
  constructor(
    public VersionArn: string = '',
    public Accuracy: string = '',
    public F1Score: string = '',
    public Precision: string = '',
    public Recall: string = ''
  ) {
  }
}

