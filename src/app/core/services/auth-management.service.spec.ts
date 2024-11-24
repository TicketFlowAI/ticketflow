import { TestBed } from '@angular/core/testing';
import { AuthManagementService } from './auth-management.service';
import { TokenService } from './token.service';
import { SanctumService } from '../api/servicios-mindsoftdev/sanctum.service';
import { AuthService } from '../api/servicios-mindsoftdev/auth.service';
import { IUserModel } from '../models/entities/user.model';
import { UserManagementService } from './user-management.service';
import { of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

const mockResponseSuccess = new HttpResponse({ status: 200 });
const mockResponseError = new HttpResponse({ status: 500 });

describe('AuthService', () => {
  let service: AuthManagementService;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  let sanctumServiceSpy: jasmine.SpyObj<SanctumService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userManagementServiceSpy: jasmine.SpyObj<UserManagementService>

  beforeEach(() => {
    const userManagementSpy = jasmine.createSpyObj('UserManagementService', ['getMyUser']);
    
    // Configura currentUser como un objeto con set como spy
    userManagementSpy.currentUser = {
      set: jasmine.createSpy('set'), // Ahora es un spy
      value: null,
    };
  
    const tokenSpy = jasmine.createSpyObj('TokenService', ['getToken', 'tokenExists', 'clearAll']);
    const sanctumSpy = jasmine.createSpyObj('SanctumService', ['getCsrfCookie']);
    const authSpy = jasmine.createSpyObj('AuthService', ['loginWithCredentials', 'logout']);
  
    TestBed.configureTestingModule({
      providers: [
        { provide: TokenService, useValue: tokenSpy },
        { provide: SanctumService, useValue: sanctumSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: UserManagementService, useValue: userManagementSpy },
        AuthManagementService,
      ],
    });
  
    service = TestBed.inject(AuthManagementService);
    tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    sanctumServiceSpy = TestBed.inject(SanctumService) as jasmine.SpyObj<SanctumService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    userManagementServiceSpy = TestBed.inject(UserManagementService) as jasmine.SpyObj<UserManagementService>;
  });  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should autenticate the user if token exists', () => {
    tokenServiceSpy.tokenExists.and.returnValue(true)

    const mockUser: IUserModel = {
      "id": 1,
      "name": "Mindsoft",
      "lastname": "Admin",
      "email": "info@mindsoft.biz",
      "role": "super-admin",
      "company_id": 1,
      "company_name": "Mindsoft"
    }

    userManagementServiceSpy.getMyUser.and.returnValue(of(mockUser));

    service.authenticate()

    expect(userManagementServiceSpy.getMyUser).toHaveBeenCalled()
  });

  it('should login successfully', () => {
    const loginRequest = { email: 'test@mindsoft.biz', password: 'password123' };
  
    // Configurar los spies
    sanctumServiceSpy.getCsrfCookie.and.returnValue(of(mockResponseSuccess));
    authServiceSpy.loginWithCredentials.and.returnValue(of(mockResponseSuccess));
    spyOn(service, 'authenticate'); 
  
    service.login(loginRequest);
  
    expect(sanctumServiceSpy.getCsrfCookie).toHaveBeenCalled();
    expect(authServiceSpy.loginWithCredentials).toHaveBeenCalledWith(loginRequest);
    expect(service.authenticate).toHaveBeenCalled();
  });
  
  it('should handle login error', () => {
    const loginRequest = { email: 'test@mindsoft.biz', password: 'password123' };
  
    // Configura spies para lanzar errores
    sanctumServiceSpy.getCsrfCookie.and.returnValue(of(mockResponseSuccess));
    authServiceSpy.loginWithCredentials.and.returnValue(throwError(() => new Error('Login error')));
  
    // Espiar el método authenticate
    spyOn(service, 'authenticate');
  
    // Ejecutar el método login
    service.login(loginRequest);
  
    // Verificar las llamadas
    expect(sanctumServiceSpy.getCsrfCookie).toHaveBeenCalled();
    expect(authServiceSpy.loginWithCredentials).toHaveBeenCalledWith(loginRequest);
    expect(service.authenticate).not.toHaveBeenCalled(); // No se debe llamar
  });
  
  

  it('should logout successfully', () => {
    const response = new HttpResponse({
      status: 204, 
      statusText: 'No Content',
      body: null, 
    });
  
    authServiceSpy.logout.and.returnValue(of(response));
  
    service.logout();

    expect(tokenServiceSpy.clearAll).toHaveBeenCalled();
    expect(userManagementServiceSpy.currentUser.set).toHaveBeenCalledWith(null);
  });
  

  it('should not logout on error successfully', () => {
    const response = new HttpResponse({
      status: 500, 
      statusText: 'Internal Server Error',
      body: null, 
    });
  
    authServiceSpy.logout.and.returnValue(of(response));
  
    service.logout();
  
    expect(tokenServiceSpy.clearAll).not.toHaveBeenCalled();
    expect(userManagementServiceSpy.currentUser.set).not.toHaveBeenCalled();
  });  
});
