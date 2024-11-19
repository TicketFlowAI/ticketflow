import { TestBed } from '@angular/core/testing';
import { AuthManagementService } from './auth-management.service';
import { TokenService } from './token.service';
import { SanctumService } from '../api/servicios-mindsoftdev/sanctum.service';
import { AuthService } from '../api/servicios-mindsoftdev/auth.service';
import { IUserModel } from '../models/entities/user.model';
import { UserManagementService } from './user-management.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthManagementService;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  let sanctumServiceSpy: jasmine.SpyObj<SanctumService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userManagementServiceSpy: jasmine.SpyObj<UserManagementService>

  beforeEach(() => {
    const userManagementSpy = jasmine.createSpyObj('UserManagementService', ['getMyUser']);
    
    // Simular currentUser como una señal con un método set
    userManagementSpy.currentUser = {
      set: jasmine.createSpy('set'), // Mock del método set
      value: null, // Estado inicial de la señal
    };
  
    const tokenSpy = jasmine.createSpyObj('TokenService', ['getToken', 'tokenExists', 'clearAll']);
    const sanctumSpy = jasmine.createSpyObj('SanctumService', ['getCsrfCookie']);
    const authSpy = jasmine.createSpyObj('AuthenticationService', ['loginWithCredentials', 'logout']);
  
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
});
