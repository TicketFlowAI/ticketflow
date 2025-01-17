export interface IEmailTemplatesApiResponse {
    success: boolean;
    data: IEmailTemplateModel[];
  }
  
  export interface IEmailTemplateApiResponse {
    success: boolean;
    data: IEmailTemplateModel;
  }
  
  export interface IEmailTemplateModel {
    id: number;
    template_name: string;
    subject: string;
    body: string;
  }
  
  export class EmailTemplateModel implements IEmailTemplateModel {
    constructor(
      public id: number = 0,
      public template_name: string = '',
      public subject: string = '',
      public body: string = '',
    ) {
    }
  }
  