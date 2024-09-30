import {inject, Injectable} from '@angular/core';
import {TokenService} from "./token.service";
import {LoginRequest} from "../models/requests/login.request";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject, tap} from "rxjs";
import {IUserModel} from "../models/entities/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenService: TokenService = inject(TokenService)
  http: HttpClient = inject(HttpClient)

  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  user!: IUserModel

  constructor() {
    this.isAuthenticated();
  }
  login(loginRequest: LoginRequest) {
    this.http.post('dfd', loginRequest).pipe(
      tap((response: any) => {
        this.tokenService.setToken(response)
        this.isAuthenticated();
        this.getUser();
        this.user = this.getUser();
      })
    )
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
}
