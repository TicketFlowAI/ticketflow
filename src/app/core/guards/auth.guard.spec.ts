import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { authGuard } from './auth.guard';
import { UserModel, UserRoles } from '../models/entities/user.model';
import { UserManagementService } from '../services/user-management.service';

const userMock = new UserModel(
  1, 'Mr', 'NoBody', 'example@gmail.com', 1, UserRoles.Client, 'SomeCompany'
)
const userManagementServiceMock: {
  currentUser: () => UserModel | null;
} = {
  currentUser: () => null
}

describe('AuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserManagementService, useValue: userManagementServiceMock }
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should grant access if current user exists on no refresh navigation', () => {
    const currentUserSpy = spyOn(userManagementServiceMock, 'currentUser')

    currentUserSpy.and.returnValue(userMock)

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any))

    expect(result).toBeTrue()
  });

  it('should not grant access if current user not exists on refresh navigation', fakeAsync(() => {
    const currentUserSpy = spyOn(userManagementServiceMock, 'currentUser')
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    currentUserSpy.and.returnValues(null, null);

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any))

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

  it('should grant access if current user exists on refresh navigation', fakeAsync(() => {
    const currentUserSpy = spyOn(userManagementServiceMock, 'currentUser');
    currentUserSpy.and.returnValues(null, userMock);
  
    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
  
    let resolvedResult: boolean | undefined;
  
    if (result instanceof Promise) {
      result.then((res) => {
        if (typeof res === 'boolean') {
          resolvedResult = res;
        }
      });
      tick(3000);
    } else if (typeof result === 'boolean') {
      resolvedResult = result;
    }
  
    expect(resolvedResult).toBeTrue();
    expect(currentUserSpy).toHaveBeenCalledTimes(2); 
  }));
});
