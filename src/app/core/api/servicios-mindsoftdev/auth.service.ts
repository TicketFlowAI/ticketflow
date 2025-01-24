import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../../models/requests/login.request';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { ResetPasswordRequestModel } from '../../models/requests/password.request';
import { ILoginResponse } from '../../models/response/login.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private readonly apiAuthentication = this.BASE_URL + ''

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  loginWithCredentials(loginRequest: LoginRequest): Observable<ILoginResponse> {
    const customHeaders = this.customHeadersService.addXsrfToken().addAppJson().getHeaders()

    return this.http.post<ILoginResponse>(`${this.BASE_URL}/login`, loginRequest, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  logout(): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addXsrfToken().addAppJson().getHeaders()
    return this.http.post<any>(`${this.apiAuthentication}/logout`, null, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  requestPasswordReset(email: string): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();

    return this.http.post<any>(`${this.apiAuthentication}/forgot-password`, { email }, {
      headers: customHeaders,
      observe: 'response',
      withCredentials: true
    });
  }

  resetPassword(request: ResetPasswordRequestModel): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.post(`${this.apiAuthentication}/reset-password`, request, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response',
    });
  }

  enableTwoFactorAuth(): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.post(`${this.apiAuthentication}/user/two-factor-authentication`, {}, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response',
    });
  }

  confirmTwoFactorAuth(code: string): Observable<any> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.post(`${this.apiAuthentication}/user/confirmed-two-factor-authentication`, { code }, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response',
    });
  }

  challengeTwoFactor(code: string): Observable<any> {
    const json = code.length > 6? { recovery_code: code} : { code: code}
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.post(`${this.apiAuthentication}/two-factor-challenge`, json, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response',
    });
  }

  disableTwoFactorAuth(): Observable<any> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.delete(`${this.apiAuthentication}/user/two-factor-authentication`, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response',
    });
  }

  getTwoFactorQrCode(): Observable<{ svg: string }> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().addCustomHeader('X-Requested-With', 'XMLHttpRequest').getHeaders();
    return this.http.get<{ svg: string }>(`${this.apiAuthentication}/user/two-factor-qr-code`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getRecoveryCodes(): Observable<string[]> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<string[]>(`${this.apiAuthentication}/user/two-factor-recovery-codes`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  generateRecoveryCodes(): Observable<string[]> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.post<string[]>(`${this.apiAuthentication}/user/two-factor-recovery-codes`, {}, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  confirmPassword(payload: { password: string }): Observable<any> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.post(`${this.apiAuthentication}/user/confirm-password`, payload, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response',
    });
  }
}
