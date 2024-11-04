import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../../models/requests/login.request';
import { CustomHeadersService } from '../../utils/custom-headers.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private apiAuthentication = this.BASE_URL + ''

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  loginWithCredentials(loginRequest: LoginRequest): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addXsrfToken().addAppJson().getHeaders()

    return this.http.post<any>(`${this.BASE_URL}/login`, loginRequest, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    }
    );
  }

  logout(): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addXsrfToken().addAppJson().getHeaders()
    return this.http.post<any>(`${this.apiAuthentication}/logout`, null,
      {
        headers: customHeaders,
        withCredentials: true,
        observe: 'response'
      })
  }
}
