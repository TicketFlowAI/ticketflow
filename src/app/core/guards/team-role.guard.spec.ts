import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { teamRoleGuard } from './team-role.guard';
import { UserModel, UserRoles } from '../models/entities/user.model';
import { UserManagementService } from '../services/user-management.service';

const userTechnicianMock = new UserModel(
  1, 'Mr', 'NoBody', 'example@gmail.com', 1, UserRoles.Technician, 'SomeCompany'
)

const userNoTechnicianMock = new UserModel(
  1, 'Mr', 'NoBody', 'example@gmail.com', 1, UserRoles.Client, 'SomeCompany'
)

const userManagementServiceMock: {
  currentUser: () => UserModel | null;
  isUserTeam: () => boolean;
} = {
  currentUser: () => null,
  isUserTeam: () => false
}

describe('teamRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => teamRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserManagementService, useValue: userManagementServiceMock },
      ]
    })
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should not grant access if current user is not team on no refresh navigation', () => {
    const currentUserSpy = spyOn(userManagementServiceMock, 'currentUser')
    const isUserTeamSpy = spyOn(userManagementServiceMock, 'isUserTeam')
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    currentUserSpy.and.returnValue(userNoTechnicianMock)
    isUserTeamSpy.and.returnValue(false)

    const result = TestBed.runInInjectionContext(() => teamRoleGuard({} as any, {} as any))

    expect(result).toBeFalse()
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should grant access if current user is team on no refresh navigation', () => {
    const currentUserSpy = spyOn(userManagementServiceMock, 'currentUser')
    const isUserTeamSpy = spyOn(userManagementServiceMock, 'isUserTeam')

    currentUserSpy.and.returnValue(userTechnicianMock)
    isUserTeamSpy.and.returnValue(true)

    const result = TestBed.runInInjectionContext(() => teamRoleGuard({} as any, {} as any))

    expect(result).toBeTrue()
  });

  it('should not grant access if current user is not team on refresh navigation', fakeAsync(() => {
    const currentUserSpy = spyOn(userManagementServiceMock, 'currentUser')
    const isUserTeamSpy = spyOn(userManagementServiceMock, 'isUserTeam')
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    currentUserSpy.and.returnValue(null)
    isUserTeamSpy.and.returnValue(false)

    const result = TestBed.runInInjectionContext(() => teamRoleGuard({} as any, {} as any))

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


  it('should grant access if current user is team on refresh navigation', fakeAsync(() => {
    const currentUserSpy = spyOn(userManagementServiceMock, 'currentUser')
    const isUserTeamSpy = spyOn(userManagementServiceMock, 'isUserTeam')
    
    currentUserSpy.and.returnValue(null)
    isUserTeamSpy.and.returnValue(true)

    const result = TestBed.runInInjectionContext(() => teamRoleGuard({} as any, {} as any))

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
