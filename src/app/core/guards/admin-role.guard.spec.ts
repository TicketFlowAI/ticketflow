import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { adminRoleGuard } from './admin-role.guard';
import { UserManagementService } from '../services/user-management.service';
import { UserModel, UserRoles } from '../models/entities/user.model';

const userAdminMock = new UserModel(
  1, 'Mr', 'NoBody', 'example@gmail.com', 1, UserRoles.Admin, 'SomeCompany'
)

const userNoAdminMock = new UserModel(
  1, 'Mr', 'NoBody', 'example@gmail.com', 1, UserRoles.Client, 'SomeCompany'
)

const userManagementServiceMock: {
  currentUser: () => UserModel | null;
  isUserAdmin: () => boolean;
} = {
  currentUser: () => null,
  isUserAdmin: () => false
}

describe('AdminRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => adminRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserManagementService, useValue: userManagementServiceMock },
      ]
    })
  }
  )

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should not grant access if current user is not admin on no refresh navigation', () => {
    const currentUserSpy = spyOn(userManagementServiceMock, 'currentUser')
    const isUserAdminSpy = spyOn(userManagementServiceMock, 'isUserAdmin')
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    currentUserSpy.and.returnValue(userNoAdminMock)
    isUserAdminSpy.and.returnValue(false)

    const result = TestBed.runInInjectionContext(() => adminRoleGuard({} as any, {} as any))

    expect(result).toBeFalse()
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should grant access if current user is admin on no refresh navigation', () => {
    const currentUserSpy = spyOn(userManagementServiceMock, 'currentUser')
    const isUserAdminSpy = spyOn(userManagementServiceMock, 'isUserAdmin')

    currentUserSpy.and.returnValue(userAdminMock)
    isUserAdminSpy.and.returnValue(true)

    const result = TestBed.runInInjectionContext(() => adminRoleGuard({} as any, {} as any))

    expect(result).toBeTrue()
  });

  it('should not grant access if current user is not admin on refresh navigation', fakeAsync(() => {
    const currentUserSpy = spyOn(userManagementServiceMock, 'currentUser')
    const isUserAdminSpy = spyOn(userManagementServiceMock, 'isUserAdmin')
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    currentUserSpy.and.returnValue(null)
    isUserAdminSpy.and.returnValue(false)

    const result = TestBed.runInInjectionContext(() => adminRoleGuard({} as any, {} as any))

    let resolvedResult: boolean | undefined;

    if (result instanceof Promise) {
      result.then((res) => {
        if (typeof res === 'boolean') {
          resolvedResult = res;
        }
      });
      tick(2000);
    } else if (typeof result === 'boolean') {
      resolvedResult = result;
    }

    expect(resolvedResult).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  }));


  it('should grant access if current user is admin on refresh navigation', fakeAsync(() => {
    const currentUserSpy = spyOn(userManagementServiceMock, 'currentUser')
    const isUserAdminSpy = spyOn(userManagementServiceMock, 'isUserAdmin')
    
    currentUserSpy.and.returnValue(null)
    isUserAdminSpy.and.returnValue(true)

    const result = TestBed.runInInjectionContext(() => adminRoleGuard({} as any, {} as any))

    let resolvedResult: boolean | undefined;

    if (result instanceof Promise) {
      result.then((res) => {
        if (typeof res === 'boolean') {
          resolvedResult = res;
        }
      });
      tick(2000);
    } else if (typeof result === 'boolean') {
      resolvedResult = result;
    }

    expect(resolvedResult).toBeTrue();
  }));
});
