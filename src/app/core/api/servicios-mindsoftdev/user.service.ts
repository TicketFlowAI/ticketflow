import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../../models/requests/login.request';
import { IUserModelResponse, UserModel } from '../../models/entities/user.model';
import { CustomHeadersService } from '../../utils/custom-headers.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private apiUser = this.BASE_URL + '/api/user'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods

  getUsers(): Observable<IUserModelResponse> {
    const customHeader = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IUserModelResponse>(`${this.apiUser}`, { headers: customHeader, withCredentials: true});
  }

  getUserById(id: number): Observable<IUserModelResponse> {
    const customHeader = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IUserModelResponse>(`${this.apiUser}/${id}`, { headers: customHeader, withCredentials: true});
  }

  getUser(): Observable<UserModel> {
    const customHeader = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<UserModel>(`${this.apiUser}`, { headers: customHeader, withCredentials: true});
  }

  createUser(userToAdd: UserModel): Observable<HttpResponse<any>> {
    const customHeader = this.customHeadersService.addAppJson().getHeaders();
    return this.http.post<any>(`${this.apiUser}`, userToAdd, { headers: customHeader, withCredentials: true, observe: 'response'});
  }

  updateUser(userToUpdate: any): Observable<HttpResponse<any>> {
    const customHeader = this.customHeadersService.addAppJson().getHeaders();
    return this.http.put<any>(`${this.apiUser}`, userToUpdate ,{ headers: customHeader, withCredentials: true, observe: 'response' });
  }

  deleteUser(id: number): Observable<HttpResponse<any>> {
    const customHeader = this.customHeadersService.addAppJson().getHeaders();
    return this.http.delete<any>(`${this.apiUser}/${id}`, { headers: customHeader, withCredentials: true, observe: 'response' });
  }
}
