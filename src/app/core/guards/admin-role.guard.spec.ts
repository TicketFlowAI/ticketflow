import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { adminRoleGuard } from './admin-role.guard';
import { UserManagementService } from '../services/user-management.service';

describe('adminRoleGuard', () => {
  let userManagementServiceMock: jasmine.SpyObj<UserManagementService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const userManagementServiceSpy = jasmine.createSpyObj('UserManagementService', ['currentUser', 'isUserAdmin']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: UserManagementService, useValue: userManagementServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    userManagementServiceMock = TestBed.inject(UserManagementService) as jasmine.SpyObj<UserManagementService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should return false and navigate to "/" if there is no current user', () => {
    userManagementServiceMock.currentUser.and.returnValue(null);

    const result = TestBed.runInInjectionContext(() => adminRoleGuard({} as any, {} as any));

    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should return false if the current user is not an admin', () => {
    userManagementServiceMock.currentUser.and.returnValue({
      id: 1,
      name: 'John',
      lastname: 'Doe',
      email: 'eazmple@gmail.com',
      role: 'client',
      company_id: 1,
      company_name: 'example company',
    });
    userManagementServiceMock.isUserAdmin.and.returnValue(false);

    const result = TestBed.runInInjectionContext(() => adminRoleGuard({} as any, {} as any));

    expect(result).toBeFalse();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should return true if the current user is an admin (super-admin)', () => {
    userManagementServiceMock.currentUser.and.returnValue({
      id: 1,
      name: 'Jane',
      lastname: 'Doe',
      email: 'eazmple@gmail.com',
      role: 'super-admin',
      company_id: 1,
      company_name: 'example company',
    });
    userManagementServiceMock.isUserAdmin.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() => adminRoleGuard({} as any, {} as any));

    expect(result).toBeTrue();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should not call isUserAdmin if there is no current user', () => {
    userManagementServiceMock.currentUser.and.returnValue(null);
  
    TestBed.runInInjectionContext(() => adminRoleGuard({} as any, {} as any));
  
    expect(userManagementServiceMock.isUserAdmin).not.toHaveBeenCalled();
  });
  
  it('should return false if the current user has no role defined', () => {
    userManagementServiceMock.currentUser.and.returnValue({
      id: 1,
      name: 'John',
      lastname: 'Doe',
      email: 'eazmple@gmail.com',
      role: 'non-specified', // Sin rol explícito
      company_id: 1,
      company_name: 'example company',
    });
    userManagementServiceMock.isUserAdmin.and.returnValue(false);
  
    const result = TestBed.runInInjectionContext(() => adminRoleGuard({} as any, {} as any));
  
    expect(result).toBeFalse();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

});
