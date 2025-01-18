import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { IUserRolesModelResponse, IUserRoleModelResponse } from '../../models/entities/user-role.model';
import { IPermissionsModelResponse } from '../../models/entities/permission.model';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
//Variables
  private readonly BASE_URL = environment.apiEndpoint
  private readonly apiRole = this.BASE_URL + '/api/roles'
  private readonly apiPermissions = this.BASE_URL + '/api/permissions'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getUserRoles(): Observable<IUserRolesModelResponse> {
    const customHeader = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IUserRolesModelResponse>(`${this.apiRole}`, {
      headers: customHeader,
      withCredentials: true
    });
  }

  getPermissions(): Observable<IPermissionsModelResponse> {
    const customHeader = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IPermissionsModelResponse>(`${this.apiPermissions}`, {
      headers: customHeader,
      withCredentials: true
    });
  }

  getUserRole(id: number): Observable<IUserRoleModelResponse> {
    const customHeader = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IUserRoleModelResponse>(`${this.apiRole}/${id}`, {
      headers: customHeader,
      withCredentials: true
    });
  }

  createUserRole(user: any): Observable<HttpResponse<any>> {
    const customHeader = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.post<any>(`${this.apiRole}`, user, {
      headers: customHeader,
      withCredentials: true,
      observe: 'response'
    });
  }

  updateUserRole(user: any): Observable<HttpResponse<any>> {
    const customHeader = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.put<any>(`${this.apiRole}/${user.id}`, user, {
      headers: customHeader,
      withCredentials: true,
      observe: 'response'
    });
  }

  deleteUserRole(name: string): Observable<HttpResponse<any>> {
    const customHeader = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.delete<any>(`${this.apiRole}/${name}`, {
      headers: customHeader,
      withCredentials: true,
      observe: 'response'
    });
  }
}
