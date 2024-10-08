import {inject, Injectable} from '@angular/core';
import {TokenService} from "./token.service";
import {LoginRequest} from "../models/requests/login.request";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject, switchMap, tap} from "rxjs";
import {IUserModel, UserModel} from "../models/entities/user.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = environment.apiEndpoint
  tokenService: TokenService = inject(TokenService)
  http: HttpClient = inject(HttpClient)

  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  user!: IUserModel

  getAuthCookie(): Observable<HttpResponse<any>>{ 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.get<any>(`${this.BASE_URL}/sanctum/csrf-cookie`, { headers: headers, withCredentials: true })
  }

  loginWithCookie(loginRequest: LoginRequest): Observable<HttpResponse<any>> {
    const xsrfToken = this.tokenService.getToken();
  
    const headers = new HttpHeaders({
      'X-XSRF-TOKEN': xsrfToken || '',
      'Content-Type': 'application/json' // Especifica que el contenido es JSON
    });
  
    return this.http.post<any>(
      `${this.BASE_URL}/login`,
      loginRequest, // Esto se enviará como JSON automáticamente si es un objeto JS
      {
        headers: headers,
        withCredentials: true, // Necesario para enviar cookies con la solicitud
        observe: 'response' // Para obtener el objeto HttpResponse completo
      }
    );
  }
  
  getUser(): Observable<UserModel> {
    const xsrfToken = this.tokenService.getToken();
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.get<UserModel>(`${this.BASE_URL}/api/user`, { headers: headers, withCredentials: true });
  }
  
  isAuthenticated() {
    this.isLoggedIn$.next(!!this.tokenService.getToken())
  }

  logout() {
    return this.http.post(`${this.BASE_URL}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.tokenService.clearToken();
        this.isLoggedIn$.next(false);
      })
    );
  }
}
