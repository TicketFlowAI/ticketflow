export interface IServiceCategoriesApiResponse {
  success: boolean;
  data: IServiceCategoryModel[];
}

export interface IServiceCategoryApiResponse {
  success: boolean;
  data: IServiceCategoryModel;
}


export interface IServiceCategoryModel {
  id: number;
  category: string;
}

export class ServiceCategoryModel implements IServiceCategoryModel {
  constructor(
    public id: number = 0,
    public category: string = '',
  ) {
  }
}
