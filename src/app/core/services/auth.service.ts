import {inject, Injectable} from '@angular/core';
import {TokenService} from "./token.service";
import {LoginRequest} from "../models/requests/login.request";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject, switchMap, tap} from "rxjs";
import {IUserModel} from "../models/entities/user.model";
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

  constructor() {
    this.isAuthenticated();
  }

  getAuthCookie(): Observable<HttpResponse<any>>{ 
    return this.http.get<any>(`${this.BASE_URL}/sanctum/csrf-cookie`)
  }

  loginWithCookie(loginRequest: LoginRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.BASE_URL}/login`, loginRequest, { withCredentials: true })
  }
  
  isAuthenticated() {
    this.isLoggedIn$.next(!!this.tokenService.getToken())
  }

  private getUser(): IUserModel {
    return JSON.parse(this.tokenService.getToken().split('.')[1]) as IUserModel
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
