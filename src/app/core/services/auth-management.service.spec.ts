import { TestBed } from '@angular/core/testing';
import { AuthManagementService } from './auth-management.service';
import { TokenService } from './token.service';
import { SanctumService } from '../api/servicios-mindsoftdev/sanctum.service';
import { AuthService } from '../api/servicios-mindsoftdev/auth.service';
import { IUserModel } from '../models/entities/user.model';
import { UserManagementService } from './user-management.service';
import { of, throwError } from 'rxjs';
import { HttpResponse, HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { SpinnerService } from '../../shared/services/spinner.service';
import { LoginRequest } from '../models/requests/login.request';
import { ResetPasswordRequestModel } from '../models/requests/password.request';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/services/message.service';

describe('AuthManagementService', () => {
  let service: AuthManagementService;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  let sanctumServiceSpy: jasmine.SpyObj<SanctumService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userManagementServiceSpy: jasmine.SpyObj<UserManagementService>;
  let spinnerServiceSpy: jasmine.SpyObj<SpinnerService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let routerServiceSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const userManagementSpy = jasmine.createSpyObj('UserManagementService', ['getMyUser']);
    userManagementSpy.currentUser = {
      set: jasmine.createSpy('set'),
      value: null,
    };
  
    const tokenSpy = jasmine.createSpyObj('TokenService', ['getToken', 'tokenExists', 'clearAll']);
    const sanctumSpy = jasmine.createSpyObj('SanctumService', ['getCsrfCookie']);
    const authSpy = jasmine.createSpyObj('AuthService', [
      'loginWithCredentials',
      'logout',
      'requestPasswordReset',
      'resetPassword',
      'enableTwoFactorAuth',
      'disableTwoFactorAuth',
      'getTwoFactorQrCode',
      'getRecoveryCodes',
      'generateRecoveryCodes',
      'confirmPassword',
      'confirmTwoFactorAuth',
      'challengeTwoFactor',
    ]);
    const spinnerSpy = jasmine.createSpyObj('SpinnerService', [
      'showDialogSpinner',
      'showGlobalSpinner',
      'hideDialogSpinner',
      'hideGlobalSpinner',
    ]);
    const messageSpy = jasmine.createSpyObj('MessageService', [
      'addSuccessMessage',
      'addWarningMessage',
      'addErrorMessage',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
  
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTransloco({
          config: {
            availableLangs: ['es', 'en'],
            defaultLang: 'es',
            reRenderOnLangChange: true,
            prodMode: !isDevMode(),
          },
          loader: TranslocoHttpLoader,
        }),
        { provide: TokenService, useValue: tokenSpy },
        { provide: SanctumService, useValue: sanctumSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: UserManagementService, useValue: userManagementSpy },
        { provide: SpinnerService, useValue: spinnerSpy },
        { provide: MessageService, useValue: messageSpy },
        { provide: Router, useValue: routerSpy },
        AuthManagementService,
      ],
    });
  
    service = TestBed.inject(AuthManagementService);
    tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    sanctumServiceSpy = TestBed.inject(SanctumService) as jasmine.SpyObj<SanctumService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    userManagementServiceSpy = TestBed.inject(UserManagementService) as jasmine.SpyObj<UserManagementService>;
    spinnerServiceSpy = TestBed.inject(SpinnerService) as jasmine.SpyObj<SpinnerService>;
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    routerServiceSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate the user if token exists', () => {
    tokenServiceSpy.tokenExists.and.returnValue(true);

    const mockUser: IUserModel = {
      id: 1,
      name: 'Mindsoft',
      lastname: 'Admin',
      email: 'info@mindsoft.biz',
      role: 'super-admin',
      company_id: 1,
      company_name: 'Mindsoft',
      password: 'password123',
      twoFactorEnabled: 1
    };

    userManagementServiceSpy.getMyUser.and.returnValue(of(mockUser));

    service.authenticate();

    expect(userManagementServiceSpy.getMyUser).toHaveBeenCalled();
    expect(userManagementServiceSpy.currentUser.set).toHaveBeenCalledWith(mockUser);
  });

  it('should login successfully', () => {
    const loginRequest: LoginRequest = { email: 'test@mindsoft.biz', password: 'password123' };

    sanctumServiceSpy.getCsrfCookie.and.returnValue(of(new HttpResponse({ status: 200 })));
    authServiceSpy.loginWithCredentials.and.returnValue(of({ two_factor: false }));

    service.login(loginRequest).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    expect(sanctumServiceSpy.getCsrfCookie).toHaveBeenCalled();
    expect(authServiceSpy.loginWithCredentials).toHaveBeenCalledWith(loginRequest);
  });

  it('should handle login error', () => {
    const loginRequest: LoginRequest = { email: 'test@mindsoft.biz', password: 'password123' };

    sanctumServiceSpy.getCsrfCookie.and.returnValue(of(new HttpResponse({ status: 200 })));
    authServiceSpy.loginWithCredentials.and.returnValue(throwError(() => new Error('Login error')));

    service.login(loginRequest).subscribe((response) => {
      expect(response).toBeNull();
    });

    expect(sanctumServiceSpy.getCsrfCookie).toHaveBeenCalled();
    expect(authServiceSpy.loginWithCredentials).toHaveBeenCalledWith(loginRequest);
  });

  it('should logout successfully', () => {
    authServiceSpy.logout.and.returnValue(of(new HttpResponse({ status: 204 })));

    service.logout();

    expect(tokenServiceSpy.clearAll).toHaveBeenCalled();
    expect(userManagementServiceSpy.currentUser.set).toHaveBeenCalledWith(null);
  });

  it('should request password reset successfully', () => {
    sanctumServiceSpy.getCsrfCookie.and.returnValue(of(new HttpResponse({ status: 200 })));
    authServiceSpy.requestPasswordReset.and.returnValue(of(new HttpResponse({ status: 200 })));

    service.requestPasswordReset('test@mindsoft.biz').subscribe((response) => {
      expect(response).toBe(true);
    });

    expect(authServiceSpy.requestPasswordReset).toHaveBeenCalledWith('test@mindsoft.biz');
  });

  it('should handle password reset error', () => {
    sanctumServiceSpy.getCsrfCookie.and.returnValue(of(new HttpResponse({ status: 200 })));
    authServiceSpy.requestPasswordReset.and.returnValue(throwError(() => new Error('Error')));

    service.requestPasswordReset('test@mindsoft.biz').subscribe((response) => {
      expect(response).toBe(false);
    });

    expect(authServiceSpy.requestPasswordReset).toHaveBeenCalledWith('test@mindsoft.biz');
  });

  it('should reset password successfully', () => {
    sanctumServiceSpy.getCsrfCookie.and.returnValue(of(new HttpResponse({ status: 200 })));
    authServiceSpy.resetPassword.and.returnValue(of(new HttpResponse({ status: 200 })));

    const resetRequest: ResetPasswordRequestModel = {
      email: 'test@mindsoft.biz',
      token: 'token123',
      password: 'newPassword123',
      password_confirmation: 'newPassword123',
    };

    service.resetPassword(resetRequest).subscribe((response) => {
      expect(response).toBe(true);
    });

    expect(authServiceSpy.resetPassword).toHaveBeenCalledWith(resetRequest);
  });

  it('should handle reset password error', () => {
    sanctumServiceSpy.getCsrfCookie.and.returnValue(of(new HttpResponse({ status: 200 })));
    authServiceSpy.resetPassword.and.returnValue(throwError(() => new Error('Error')));

    const resetRequest: ResetPasswordRequestModel = {
      email: 'test@mindsoft.biz',
      token: 'token123',
      password: 'newPassword123',
      password_confirmation: 'newPassword123',
    };

    service.resetPassword(resetRequest).subscribe((response) => {
      expect(response).toBe(false);
    });

    expect(authServiceSpy.resetPassword).toHaveBeenCalledWith(resetRequest);
  });

  it('should enable two-factor authentication successfully', () => {
    authServiceSpy.enableTwoFactorAuth.and.returnValue(of(new HttpResponse({ status: 200 })));

    service.enableTwoFactorAuth().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    expect(authServiceSpy.enableTwoFactorAuth).toHaveBeenCalled();
    expect(spinnerServiceSpy.hideDialogSpinner).toHaveBeenCalled();
  });

  it('should handle error when enabling two-factor authentication', () => {
    authServiceSpy.enableTwoFactorAuth.and.returnValue(throwError(() => new Error('Error')));

    service.enableTwoFactorAuth().subscribe((response) => {
      expect(response).toBeNull();
    });

    expect(authServiceSpy.enableTwoFactorAuth).toHaveBeenCalled();
    expect(spinnerServiceSpy.hideDialogSpinner).toHaveBeenCalled();
  });

  it('should disable two-factor authentication successfully', () => {
    authServiceSpy.disableTwoFactorAuth.and.returnValue(of(new HttpResponse({ status: 200 })));

    service.disableTwoFactorAuth().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    expect(authServiceSpy.disableTwoFactorAuth).toHaveBeenCalled();
    expect(spinnerServiceSpy.hideDialogSpinner).toHaveBeenCalled();
  });

  it('should handle error when disabling two-factor authentication', () => {
    authServiceSpy.disableTwoFactorAuth.and.returnValue(throwError(() => new Error('Error')));

    service.disableTwoFactorAuth().subscribe((response) => {
      expect(response).toBeNull();
    });

    expect(authServiceSpy.disableTwoFactorAuth).toHaveBeenCalled();
    expect(spinnerServiceSpy.hideDialogSpinner).toHaveBeenCalled();
  });

  it('should get two-factor QR code successfully', () => {
    const mockQrCode = { svg: 'mock-qr-code' };
    authServiceSpy.getTwoFactorQrCode.and.returnValue(of(mockQrCode));

    service.getTwoFactorQrCode().subscribe((response) => {
      expect(response).toBe(mockQrCode);
    });

    expect(authServiceSpy.getTwoFactorQrCode).toHaveBeenCalled();
    expect(spinnerServiceSpy.hideDialogSpinner).toHaveBeenCalled();
  });


  it('should handle error when getting two-factor QR code', () => {
    authServiceSpy.getTwoFactorQrCode.and.returnValue(throwError(() => new Error('Error')));

    service.getTwoFactorQrCode().subscribe((response) => {
      expect(response).toBeNull();
    });

    expect(authServiceSpy.getTwoFactorQrCode).toHaveBeenCalled();
    expect(spinnerServiceSpy.hideDialogSpinner).toHaveBeenCalled();
  });

  it('should get recovery codes successfully', () => {
    const mockRecoveryCodes = ['code1', 'code2'];
    authServiceSpy.getRecoveryCodes.and.returnValue(of(mockRecoveryCodes));

    service.getRecoveryCodes().subscribe((response) => {
      expect(response).toEqual(mockRecoveryCodes);
    });

    expect(authServiceSpy.getRecoveryCodes).toHaveBeenCalled();
    expect(spinnerServiceSpy.hideDialogSpinner).toHaveBeenCalled();
  });

  it('should handle error when getting recovery codes', () => {
    authServiceSpy.getRecoveryCodes.and.returnValue(throwError(() => new Error('Error')));

    service.getRecoveryCodes().subscribe((response) => {
      expect(response).toEqual([]);
    });

    expect(authServiceSpy.getRecoveryCodes).toHaveBeenCalled();
    expect(spinnerServiceSpy.hideDialogSpinner).toHaveBeenCalled();
  });

  it('should confirm two-factor authentication successfully', () => {
    authServiceSpy.confirmTwoFactorAuth.and.returnValue(of(new HttpResponse({ status: 200 })));

    service.confirmTwoFactorAuth('123456');

    expect(authServiceSpy.confirmTwoFactorAuth).toHaveBeenCalledWith('123456');
    expect(spinnerServiceSpy.hideGlobalSpinner).toHaveBeenCalled();
  });

  it('should handle error when confirming two-factor authentication', () => {
    authServiceSpy.confirmTwoFactorAuth.and.returnValue(throwError(() => new Error('Error')));

    service.confirmTwoFactorAuth('123456');

    expect(authServiceSpy.confirmTwoFactorAuth).toHaveBeenCalledWith('123456');
    expect(spinnerServiceSpy.hideGlobalSpinner).toHaveBeenCalled();
  });

  it('should handle two-factor challenge successfully with a regular code', () => {
    const mockCode = '123456'; // Código regular (6 caracteres)
    authServiceSpy.challengeTwoFactor.and.returnValue(of(new HttpResponse({ status: 200 })));

    service.twoFactorChallenge(mockCode);

    expect(authServiceSpy.challengeTwoFactor).toHaveBeenCalledWith({ code: mockCode });
    expect(spinnerServiceSpy.hideGlobalSpinner).toHaveBeenCalled();
    expect(messageServiceSpy.addSuccessMessage).toHaveBeenCalled();
    expect(routerServiceSpy.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should handle two-factor challenge successfully with a recovery code', () => {
    const mockRecoveryCode = 'ABCDEFG12345'; // Código de recuperación (más de 6 caracteres)
    authServiceSpy.challengeTwoFactor.and.returnValue(of(new HttpResponse({ status: 200 })));

    service.twoFactorChallenge(mockRecoveryCode);

    expect(authServiceSpy.challengeTwoFactor).toHaveBeenCalledWith({ recovery_code: mockRecoveryCode });
    expect(spinnerServiceSpy.hideGlobalSpinner).toHaveBeenCalled();
    expect(messageServiceSpy.addSuccessMessage).toHaveBeenCalled();
    expect(routerServiceSpy.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should handle two-factor challenge with an invalid code', () => {
    const mockCode = '123456';
    authServiceSpy.challengeTwoFactor.and.returnValue(
      throwError(() => ({ status: HttpStatusCode.UnprocessableEntity }))
    );

    service.twoFactorChallenge(mockCode);

    expect(authServiceSpy.challengeTwoFactor).toHaveBeenCalledWith({ code: mockCode });
    expect(spinnerServiceSpy.hideGlobalSpinner).toHaveBeenCalled();
    expect(messageServiceSpy.addWarningMessage).toHaveBeenCalled();
  });

  it('should handle two-factor challenge with a general error', () => {
    const mockCode = '123456';
    authServiceSpy.challengeTwoFactor.and.returnValue(
      throwError(() => ({ status: HttpStatusCode.InternalServerError }))
    );

    service.twoFactorChallenge(mockCode);

    expect(authServiceSpy.challengeTwoFactor).toHaveBeenCalledWith({ code: mockCode });
    expect(spinnerServiceSpy.hideGlobalSpinner).toHaveBeenCalled();
    expect(messageServiceSpy.addErrorMessage).toHaveBeenCalled();
  });

  it('should handle error when two-factor challenge fails', () => {
    const mockCode = '123456'; // Código regular (6 caracteres)
    authServiceSpy.challengeTwoFactor.and.returnValue(throwError(() => new Error('Error')));
  
    service.twoFactorChallenge(mockCode);
  
    expect(authServiceSpy.challengeTwoFactor).toHaveBeenCalledWith({ code: mockCode }); // Cambiado para reflejar el formato correcto
    expect(spinnerServiceSpy.hideGlobalSpinner).toHaveBeenCalled();
  });
  

});
