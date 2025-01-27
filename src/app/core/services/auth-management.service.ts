import { inject, Injectable } from '@angular/core';
import { TokenService } from "./token.service";
import { LoginRequest } from "../models/requests/login.request";
import { catchError, concatMap, finalize, map, of } from "rxjs";
import { SpinnerService } from '../../shared/services/spinner.service';
import { SanctumService } from '../api/servicios-mindsoftdev/sanctum.service';
import { AuthService } from '../api/servicios-mindsoftdev/auth.service';
import { HttpStatusCode } from '@angular/common/http';
import { UserManagementService } from './user-management.service';
import { MessageService } from '../../shared/services/message.service';
import { TranslocoService } from '@jsverse/transloco';
import { ResetPasswordRequestModel } from '../models/requests/password.request';
import { Router } from '@angular/router';
import { UserRoles } from '../models/entities/user.model';

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
  private readonly router = inject(Router);

  // Methods
  authenticate() {
    if (this.tokenService.tokenExists()) {
      this.userManagementService.getMyUser().subscribe({
        next: (user) => {
          const currentRoute = this.router.url;
          const twoFaRoutes = ['/2fa-setup', '/2fa-authenticate'];
  
          if (twoFaRoutes.includes(currentRoute)) {
            // Si estamos en las rutas de 2FA, setear currentUser a null
            this.userManagementService.currentUser.set(null);
          } else if (user) {
            // Si no estamos en rutas de 2FA y el usuario existe, setearlo normalmente
            if(user.role == UserRoles.Admin || 
               user.role == UserRoles.Technician || 
               user.role == UserRoles.One || 
               user.role == UserRoles.Two || 
               user.role == UserRoles.Three){
                if(user.twoFactorEnabled == 0) {
                  this.userManagementService.currentUser.set(null);
                  this.router.navigateByUrl('/2fa-setup')
                }
                else{
                  this.userManagementService.currentUser.set(user);
                }
            }
            else {
              this.userManagementService.currentUser.set(user);
            }
          } else {
            this.tokenService.clearAll();
          }
  
          this.spinnerService.hideDialogSpinner();
        },
      });
    }
  }

  login(loginRequest: LoginRequest) {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
  
    return this.sanctumService.getCsrfCookie().pipe(
      concatMap(() => this.authService.loginWithCredentials(loginRequest)),
      map((response) => {
        this.spinnerService.hideDialogSpinner();
        return response;
      }),
      catchError((error) => {
        if (error.status === HttpStatusCode.UnprocessableEntity) {
          const translate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.AUTHENTICATION-FAILED-CREDENTIALS');
          this.messageService.addWarningMessage(translate);
        }
        if (error.status === HttpStatusCode.InternalServerError) {
          const translate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.AUTHENTICATION-FAILED-SERVER-ERROR');
          this.messageService.addErrorMessage(translate);
        }
        this.spinnerService.hideDialogSpinner();
        return of(null);
      })
    );
  }
  

  logout() {
    this.userManagementService.currentUser.set(null);
    this.authService.logout().subscribe({
      next: (response) => {
        if (response.status === HttpStatusCode.NoContent) {
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
  
    return this.sanctumService.getCsrfCookie().pipe(
      concatMap(() => this.authService.resetPassword(request)),
      map(() => {
        return true; // Retorna true si el proceso fue exitoso
      }),
      catchError(() => {
        const translate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.PASSWORD-RESET-ERROR');
        this.messageService.addErrorMessage(translate);
        return of(false); // Retorna false en caso de error
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }
  

  enableTwoFactorAuth() {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
    return this.authService.enableTwoFactorAuth().pipe(
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.TWO-FACTOR-ENABLE.ERROR');
        this.messageService.addErrorMessage(transate);
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }

  disableTwoFactorAuth() {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
    return this.authService.disableTwoFactorAuth().pipe(
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.TWO-FACTOR-DISABLE.ERROR');
        this.messageService.addErrorMessage(transate);
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }

  getTwoFactorQrCode() {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
    return this.authService.getTwoFactorQrCode().pipe(
      catchError(() => of(null)),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }

  getRecoveryCodes() {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
    return this.authService.getRecoveryCodes().pipe(
      map((response) => response),
      catchError(() => of([])),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }

  generateRecoveryCodes() {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
    return this.authService.generateRecoveryCodes().pipe(
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.RECOVERY-CODES-GENERATE.ERROR');
        this.messageService.addErrorMessage(transate);
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }

  confirmPassword(password: string) {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: false });

    return this.authService.confirmPassword({ password }).pipe(
      concatMap(() =>
        this.authService.enableTwoFactorAuth().pipe(
          map(() => {
            const successMessage = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.TWO-FACTOR-CONFIRM-PASSWORD.SUCCESS');
            this.messageService.addSuccessMessage(successMessage);
            return true;
          }),
          catchError(() => {
            const errorMessage = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.TWO-FACTOR-CONFIRM-PASSWORD.ERROR');
            this.messageService.addWarningMessage(errorMessage);
            return of(false);
          })
        )
      ),
      catchError((error) => {
        if (error.status === HttpStatusCode.UnprocessableEntity) {
          const errorMessage = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.TWO-FACTOR-CONFIRM-PASSWORD.INVALID');
          this.messageService.addWarningMessage(errorMessage);
        } else {
          const generalError = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.TWO-FACTOR-CONFIRM-PASSWORD.ERROR');
          this.messageService.addErrorMessage(generalError);
        }
        return of(false);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }

  confirmTwoFactorAuth(code: string) {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: false });

    this.authService.confirmTwoFactorAuth(code).pipe(
      map(() => {
        const successMessage = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.TWO-FACTOR-AUTH.SUCCESS');
        this.messageService.addSuccessMessage(successMessage);
        this.authenticate();
        this.router.navigateByUrl('/')
      }),
      catchError((error) => {
        if (error.status === HttpStatusCode.UnprocessableEntity) {
          const errorMessage = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.TWO-FACTOR-AUTH.INVALID-CODE');
          this.messageService.addWarningMessage(errorMessage);
        } else {
          const generalError = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.TWO-FACTOR-AUTH.ERROR');
          this.messageService.addErrorMessage(generalError);
        }
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    ).subscribe();
  }

  twoFactorChallenge(code: string) {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: false });

    const json = code.length > 6? { recovery_code: code} : { code: code}

    this.authService.challengeTwoFactor(json).pipe(
      map(() => {
        const successMessage = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.TWO-FACTOR-AUTH.SUCCESS');
        this.messageService.addSuccessMessage(successMessage);
        this.authenticate();
        this.router.navigateByUrl('/')
      }),
      catchError((error) => {
        if (error.status === HttpStatusCode.UnprocessableEntity) {
          const errorMessage = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.TWO-FACTOR-AUTH.INVALID');
          this.messageService.addWarningMessage(errorMessage);
        } else {
          const generalError = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.TWO-FACTOR-AUTH.ERROR');
          this.messageService.addErrorMessage(generalError);
        }
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    ).subscribe();
  }
}
