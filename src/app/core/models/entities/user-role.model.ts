import { IPermissionModel, PermissionModel } from "./permission.model";

export interface IUserRolesModelResponse {
    success: boolean;
    data: IUserRoleModel[];
  }
  
  export interface IUserRoleModelResponse {
    success: boolean;
    data: IUserRoleModel;
  }
  
  export interface IUserRoleModel {
    id: number;
    name: string;
    permissions: IPermissionModel[]
  }

  export class UserRoleModel implements IUserRoleModel {
    constructor(
      public id: number = 0,
      public name: string = '',
      public permissions: PermissionModel[] = [],
    ) {
    }
  }