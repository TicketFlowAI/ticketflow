export interface IServiceCategoryApiResponse {
  success: boolean;
  data: IServiceCategoryModel[];
}

export interface IServiceCategoryModel {
  id: number;
  description: string;
}

export class ServiceCategoryModel implements IServiceCategoryModel {
  constructor(
    public id: number = 0,
    public description: string = '',
  ) {
  }
}
