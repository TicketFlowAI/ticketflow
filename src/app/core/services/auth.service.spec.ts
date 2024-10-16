import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { SanctumService } from '../api/servicios-mindsoftdev/sanctum.service';
import { AuthenticationService } from '../api/servicios-mindsoftdev/authentication.service';
import { of, throwError } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { LoginRequest } from '../models/requests/login.request';

describe('AuthService', () => {
  let service: AuthService;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  let sanctumServiceSpy: jasmine.SpyObj<SanctumService>;
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let spinnerServiceSpy: jasmine.SpyObj<SpinnerService>;

  beforeEach(() => {
    const tokenSpy = jasmine.createSpyObj('TokenService', ['getToken', 'clearAll']);
    const sanctumSpy = jasmine.createSpyObj('SanctumService', ['getCsrfCookie']);
    const authSpy = jasmine.createSpyObj('AuthenticationService', ['loginWithCredentials', 'logout']);
    const spinnerSpy = jasmine.createSpyObj('SpinnerService', ['showSpinner', 'hideSpinner']);

    TestBed.configureTestingModule({
      providers: [
        { provide: TokenService, useValue: tokenSpy },
        { provide: SanctumService, useValue: sanctumSpy },
        { provide: AuthenticationService, useValue: authSpy },
        { provide: SpinnerService, useValue: spinnerSpy },
        AuthService,
      ],
    });

    service = TestBed.inject(AuthService);
    tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    sanctumServiceSpy = TestBed.inject(SanctumService) as jasmine.SpyObj<SanctumService>;
    authenticationServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    spinnerServiceSpy = TestBed.inject(SpinnerService) as jasmine.SpyObj<SpinnerService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set isAuthenticated to true if token exists', () => {
    tokenServiceSpy.getToken.and.returnValue('dummy_token');

    service.isUserLoggedIn();

    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should call spinner and login with credentials on login', () => {
    const loginRequest: LoginRequest = { email: 'test@example.com', password: 'password' };
  
    sanctumServiceSpy.getCsrfCookie.and.returnValue(of(new HttpResponse({ status: 200 })));
    authenticationServiceSpy.loginWithCredentials.and.returnValue((of(new HttpResponse({ status: 200 }))));
  
    service.login(loginRequest);
  
    expect(spinnerServiceSpy.showSpinner).toHaveBeenCalled();
    expect(sanctumServiceSpy.getCsrfCookie).toHaveBeenCalled();
    expect(authenticationServiceSpy.loginWithCredentials).toHaveBeenCalledWith(loginRequest);
    expect(service.isAuthenticated()).toBeTrue();
    expect(spinnerServiceSpy.hideSpinner).toHaveBeenCalled();
  });

  it('should handle login error and hide spinner', () => {
    const loginRequest: LoginRequest = { email: 'test@example.com', password: 'password' };
    sanctumServiceSpy.getCsrfCookie.and.returnValue(of(new HttpResponse({ status: 200 })));
    authenticationServiceSpy.loginWithCredentials.and.returnValue(throwError(() => new Error('Login failed')));

    service.login(loginRequest);

    expect(spinnerServiceSpy.showSpinner).toHaveBeenCalled();
    expect(spinnerServiceSpy.hideSpinner).toHaveBeenCalled();
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should logout and clear token on successful logout', () => {
    const httpResponse = new HttpResponse({ status: HttpStatusCode.Ok });
    authenticationServiceSpy.logout.and.returnValue(of(httpResponse));

    service.logout();

    expect(authenticationServiceSpy.logout).toHaveBeenCalled();
    expect(service.isAuthenticated()).toBeFalse();
    expect(tokenServiceSpy.clearAll).toHaveBeenCalled();
  });
});
