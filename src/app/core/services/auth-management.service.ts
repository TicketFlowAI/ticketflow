import { inject, Injectable } from '@angular/core';
import { TokenService } from "./token.service";
import { LoginRequest } from "../models/requests/login.request";
import { catchError, concatMap, of } from "rxjs";
import { SpinnerService } from '../../shared/services/spinner.service';
import { SanctumService } from '../api/servicios-mindsoftdev/sanctum.service';
import { AuthService } from '../api/servicios-mindsoftdev/auth.service';
import { HttpStatusCode } from '@angular/common/http';
import { UserManagementService } from './user-management.service';
import { MessageService } from '../../shared/services/message.service';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root'
})
export class AuthManagementService {
  //Services
  private readonly userManagementService = inject(UserManagementService)
  private readonly sanctumService = inject(SanctumService)
  private readonly authService = inject(AuthService)
  private readonly tokenService = inject(TokenService)
  private readonly spinnerService = inject(SpinnerService)

  private readonly messageService = inject(MessageService)
  private readonly translocoService = inject(TranslocoService)
  //Methods
  authenticate() {
    if (this.tokenService.tokenExists()) {
      this.userManagementService.getMyUser().subscribe({
        next: (user) => {
          this.userManagementService.currentUser.set(user)
          this.spinnerService.hideDialogSpinner();
        },
      })
    }
  }

  login(loginRequest: LoginRequest) {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
    this.sanctumService.getCsrfCookie().pipe(
      concatMap(() => this.authService.loginWithCredentials(loginRequest)),
      catchError((error) => {
        if (error.status == HttpStatusCode.UnprocessableEntity) {
          const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.AUTHENTICATION-FAILED-CREDENTIALS');
          this.messageService.addWarningMessage(transate)
        }
        if (error.status == HttpStatusCode.InternalServerError) {
          const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.AUTHENTICATION-FAILED-SERVER-ERROR');
          this.messageService.addErrorMessage(transate)
        }
        this.spinnerService.hideDialogSpinner();
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          this.authenticate();
        }
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        if (response.status === HttpStatusCode.NoContent) {
          this.tokenService.clearAll();
          this.userManagementService.currentUser.set(null)
        }
      }
    })
  }
}
