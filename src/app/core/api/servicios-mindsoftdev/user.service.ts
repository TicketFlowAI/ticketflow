import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../../models/requests/login.request';
import { UserModel } from '../../models/entities/user.model';
import { CustomHeadersService } from '../../utils/custom-headers.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private apiUser = this.BASE_URL + '/api/user'
  private customHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getUser(): Observable<UserModel> {
    const customHeader = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<UserModel>(`${this.apiUser}`, { headers: customHeader, withCredentials: true });
  }
}
