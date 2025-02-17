import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IUserModelResponse, IUsersModelResponse } from '../../models/entities/user.model';
import { CustomHeadersService } from '../../utils/custom-headers.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private readonly apiUser = this.BASE_URL + '/api/user'
  private readonly apiUsers = this.BASE_URL + '/api/users'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getUsers(): Observable<IUsersModelResponse> {
    const customHeader = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IUsersModelResponse>(`${this.apiUsers}`, {
      headers: customHeader,
      withCredentials: true
    });
  }

  getMyUser(): Observable<IUserModelResponse> {
    const customHeader = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.get<IUserModelResponse>(`${this.apiUser}`, {
      headers: customHeader,
      withCredentials: true
    });
  }

  getUser(id: number): Observable<IUserModelResponse> {
    const customHeader = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IUserModelResponse>(`${this.apiUsers}/${id}`, {
      headers: customHeader,
      withCredentials: true
    });
  }

  getDeletedUsers(): Observable<IUsersModelResponse> {
      const customHeaders = this.customHeadersService.addAppJson().getHeaders()
      return this.http.get<IUsersModelResponse>(`${this.apiUsers}/deleted`, {
        headers: customHeaders,
        withCredentials: true,
      });
    }

  createUser(user: any): Observable<HttpResponse<any>> {
    const customHeader = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.post<any>(`${this.apiUsers}`, user, {
      headers: customHeader,
      withCredentials: true,
      observe: 'response'
    });
  }

  updateUser(user: any): Observable<HttpResponse<any>> {
    const customHeader = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.put<any>(`${this.apiUsers}/${user.id}`, user, {
      headers: customHeader,
      withCredentials: true,
      observe: 'response'
    });
  }

  deleteUser(id: number): Observable<HttpResponse<any>> {
    const customHeader = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.delete<any>(`${this.apiUsers}/${id}`, {
      headers: customHeader,
      withCredentials: true,
      observe: 'response'
    });
  }

  disableToFactor(id: number): Observable<HttpResponse<any>> {
    console.log('rrr')
    const customHeader = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.put<any>(`${this.apiUsers}/${id}/disable-two-factor`, {}, {
      headers: customHeader,
      withCredentials: true,
      observe: 'response'
    });
  }

  restoreUser(id: number): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders()
    return this.http.put<HttpResponse<any>>(`${this.apiUsers}/${id}/restore`, null, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }
}
