import {inject, Injectable} from '@angular/core';
import {TokenService} from "./token.service";
import {LoginRequest} from "../models/requests/login.request";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject, tap} from "rxjs";
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

  login(loginRequest: LoginRequest) {
    return this.http.post(`${this.BASE_URL}/login`, loginRequest, { withCredentials: true }).pipe(
      tap((response: any) => {
        this.tokenService.setToken(response);
        this.isAuthenticated();
        this.user = this.getUser();
      })
    );
  }

  getUserRole() {
    return this.user.roles[0]
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
