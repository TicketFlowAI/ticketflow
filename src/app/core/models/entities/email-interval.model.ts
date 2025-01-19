export interface IEmailIntervalsApiResponse {
    success: boolean;
    data: IEmailIntervalModel[];
  }
  
  export interface IEmailIntervalApiResponse {
    success: boolean;
    data: IEmailIntervalModel;
  }
  
  export interface IEmailIntervalModel {
    id: number;
    days: number;
    type: string;
    template_name: string;
    
  }
  
  export class EmailIntervalModel implements IEmailIntervalModel {
    constructor(
      public id: number = 0,
      public days: number = 0,
      public type: string = '',
      public template_name: string = '' 
    ) {
    }
  }
  