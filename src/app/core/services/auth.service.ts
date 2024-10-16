import { inject, Injectable, signal } from '@angular/core';
import { TokenService } from "./token.service";
import { LoginRequest } from "../models/requests/login.request";
import { catchError, concatMap, of } from "rxjs";
import { IUserModel } from "../models/entities/user.model";
import { SpinnerService } from '../../shared/services/spinner.service';
import { SanctumService } from '../api/servicios-mindsoftdev/sanctum.service';
import { AuthenticationService } from '../api/servicios-mindsoftdev/authentication.service';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Services
  private sanctumService = inject(SanctumService)
  private authenticationService = inject(AuthenticationService)
  private tokenService = inject(TokenService)
  private spinnerService = inject(SpinnerService)

  //Variables n properties
  isAuthenticated = signal<boolean>(false)
  user!: IUserModel

  //Methods
  isUserLoggedIn() {
    if(this.tokenService.getToken() != '') this.isAuthenticated.set(true)
  }

  login(loginRequest: LoginRequest) {
    this.spinnerService.showSpinner();

    this.sanctumService.getCsrfCookie().pipe(
      concatMap(() => this.authenticationService.loginWithCredentials(loginRequest)),
      catchError(() => {
        this.spinnerService.hideSpinner()
        return of(null);
      })
    ).subscribe({
      next: (result) => {
        if(result != null) this.isAuthenticated.set(true);
        this.spinnerService.hideSpinner()
      }
    }
    )
  }

  logout() {
    this.authenticationService.logout().subscribe({
      next: (response) => {
        if(response.status !== HttpStatusCode.Ok) return

        this.isAuthenticated.set(false)
        this.tokenService.clearAll();
      },
      error: () => {
        console.log()
      } 
    })
  }
}
