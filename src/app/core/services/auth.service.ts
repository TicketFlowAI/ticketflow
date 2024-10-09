import { inject, Injectable } from '@angular/core';
import { TokenService } from "./token.service";
import { LoginRequest } from "../models/requests/login.request";
import { BehaviorSubject, catchError, concatMap, of } from "rxjs";
import { IUserModel } from "../models/entities/user.model";
import { SpinnerService } from '../../shared/services/spinner.service';
import { SanctumService } from '../api/servicios-mindsoftdev/sanctum.service';
import { AuthenticationService } from '../api/servicios-mindsoftdev/authentication.service';
import { UserService } from '../api/servicios-mindsoftdev/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Services
  sanctumService = inject(SanctumService)
  authenticationService = inject(AuthenticationService)
  userService = inject(UserService)
  tokenService = inject(TokenService)
  spinnerService = inject(SpinnerService)


  //Variables n properties

  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  user!: IUserModel

  //Methods
  isAuthenticated() {
    this.isLoggedIn$.next(!!this.tokenService.getToken())
  }

  login(loginRequest: LoginRequest) {
    this.spinnerService.showSpinner();

    this.sanctumService.getCsrfCookie().pipe(
      concatMap(() => this.authenticationService.loginWithCredentials(loginRequest)),
      concatMap(() => this.userService.getUser()),
      catchError(() => {
        this.spinnerService.hideSpinner()
        return of(null);
      })
    ).subscribe({
      next: () => {
        this.spinnerService.hideSpinner()
      }
    }
    )
  }

  logout() {
    this.authenticationService.logout()
  }
}
