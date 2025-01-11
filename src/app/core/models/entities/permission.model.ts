export interface IPermissionsModelResponse {
    success: boolean;
    data: IPermissionModel[];
  }
  
  export interface IPermissionModelResponse {
    success: boolean;
    data: IPermissionModel;
  }
  
  export interface IPermissionModel {
    id: number
    name: string
  }

  export class PermissionModel implements IPermissionModel {
    constructor(
      public id: number = 0,
      public name: string = '',
    ) {
    }
  }