export interface IPermissionsModelResponse {
    success: boolean;
    data: IPermissionModel[];
  }
  
  export interface IPermissionModelResponse {
    success: boolean;
    data: IPermissionModel;
  }
  
  export interface IPermissionModel {
    name: string
  }

  export class PermissionModel implements IPermissionModel {
    constructor(
      public name: string = '',
    ) {
    }
  }