import { inject, Injectable } from '@angular/core';
import { TokenService } from "./token.service";
import { LoginRequest } from "../models/requests/login.request";
import { catchError, concatMap, finalize, map, of, tap } from "rxjs";
import { SpinnerService } from '../../shared/services/spinner.service';
import { SanctumService } from '../api/servicios-mindsoftdev/sanctum.service';
import { AuthService } from '../api/servicios-mindsoftdev/auth.service';
import { HttpStatusCode } from '@angular/common/http';
import { UserManagementService } from './user-management.service';
import { MessageService } from '../../shared/services/message.service';
import { TranslocoService } from '@jsverse/transloco';
import { ResetPasswordRequestModel } from '../models/requests/password.request';

@Injectable({
  providedIn: 'root'
})
export class AuthManagementService {
  // Services
  private readonly userManagementService = inject(UserManagementService);
  private readonly sanctumService = inject(SanctumService);
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly spinnerService = inject(SpinnerService);
  private readonly messageService = inject(MessageService);
  private readonly translocoService = inject(TranslocoService);

  // Methods
  authenticate() {
    if (this.tokenService.tokenExists()) {
      this.userManagementService.getMyUser().subscribe({
        next: (user) => {
          if (user) {
            this.userManagementService.currentUser.set(user);
            this.spinnerService.hideDialogSpinner();
          } else {
            console.log('No user found');
            this.tokenService.clearAll();
          }
        },
      });
    }
  }

  login(loginRequest: LoginRequest) {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
    this.sanctumService.getCsrfCookie().pipe(
      concatMap(() => this.authService.loginWithCredentials(loginRequest)),
      catchError((error) => {
        if (error.status === HttpStatusCode.UnprocessableEntity) {
          const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.AUTHENTICATION-FAILED-CREDENTIALS');
          this.messageService.addWarningMessage(transate);
        }
        if (error.status === HttpStatusCode.InternalServerError) {
          const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.AUTHENTICATION-FAILED-SERVER-ERROR');
          this.messageService.addErrorMessage(transate);
        }
        this.spinnerService.hideDialogSpinner();
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          if(response.two_factor) {

          } else {

          }
        }
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        if (response.status === HttpStatusCode.NoContent) {
          this.userManagementService.currentUser.set(null);
          this.tokenService.clearAll();
        }
      }
    });
  }

  requestPasswordReset(email: string) {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
  
    return this.sanctumService.getCsrfCookie().pipe(
      concatMap(() => 
        this.authService.requestPasswordReset(email).pipe(
          map(() => true),
          catchError(() => {
            const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.PASSWORD-RESET-REQUEST-ERROR');
            this.messageService.addErrorMessage(transate);
            return of(false);
          })
        )
      ),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }
  

  resetPassword(request: ResetPasswordRequestModel) {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
    return this.authService.resetPassword(request).pipe(
      map(() => {
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.PASSWORD-RESET-ERROR');
        this.messageService.addErrorMessage(transate);
        return of(false);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }

  enableTwoFactorAuth() {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
    this.authService.enableTwoFactorAuth().pipe(
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.TWO-FACTOR-ENABLE.ERROR');
        this.messageService.addErrorMessage(transate);
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    ).subscribe();
  }

  disableTwoFactorAuth() {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
    this.authService.disableTwoFactorAuth().pipe(
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.TWO-FACTOR-DISABLE.ERROR');
        this.messageService.addErrorMessage(transate);
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    ).subscribe();
  }

  getTwoFactorQrCode() {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
    this.authService.getTwoFactorQrCode().pipe(
      catchError(() => of(null)),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    ).subscribe();
  }

  getRecoveryCodes() {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
    this.authService.getRecoveryCodes().pipe(
      catchError(() => of([])),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    ).subscribe();
  }

  generateRecoveryCodes() {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
    this.authService.generateRecoveryCodes().pipe(
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.RECOVERY-CODES-GENERATE.ERROR');
        this.messageService.addErrorMessage(transate);
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    ).subscribe();
  }
}
