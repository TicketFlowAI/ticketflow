import { inject, Injectable } from '@angular/core';
import { TokenService } from "./token.service";
import { LoginRequest } from "../models/requests/login.request";
import { catchError, concatMap, of } from "rxjs";
import { SpinnerService } from '../../shared/services/spinner.service';
import { SanctumService } from '../api/servicios-mindsoftdev/sanctum.service';
import { AuthenticationService } from '../api/servicios-mindsoftdev/authentication.service';
import { HttpStatusCode } from '@angular/common/http';
import { UserManagementService } from './user-management.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Services
  private readonly userManagementService = inject(UserManagementService)
  private readonly sanctumService = inject(SanctumService)
  private readonly authenticationService = inject(AuthenticationService)
  private readonly tokenService = inject(TokenService)
  private readonly spinnerService = inject(SpinnerService)

  //Methods
  authenticate() {
    if(this.tokenService.tokenExists())
    {
      this.userManagementService.getMyUser().subscribe({
        next: (user) => {
            this.userManagementService.currentUser.set(user)
        },
      })
    }
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
      next: () => {
        this.authenticate()
        this.spinnerService.hideSpinner()
      }
    }
    )
  }

  logout() {
    this.authenticationService.logout().subscribe({
      next: (response) => {
        if(response.status === HttpStatusCode.NoContent){
          this.tokenService.clearAll();
          this.userManagementService.currentUser.set(null)
        }
      },
      error: () => {
      } 
    })
  }
}
