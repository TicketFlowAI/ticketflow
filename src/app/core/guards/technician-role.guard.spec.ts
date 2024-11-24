import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { teamRoleGuard } from './team-role.guard';
import { UserModel, UserRoles } from '../models/entities/user.model';
import { UserManagementService } from '../services/user-management.service';
import { technicianRoleGuard } from './technician-role.guard';

const userTechnicianMock = new UserModel(
  1, 'Mr', 'NoBody', 'example@gmail.com', 1, UserRoles.Technician, 'SomeCompany'
)

const userNoTechnicianMock = new UserModel(
  1, 'Mr', 'NoBody', 'example@gmail.com', 1, UserRoles.Client, 'SomeCompany'
)

const userManagementServiceMock: {
  currentUser: () => UserModel | null;
  isUserTechnician: () => boolean;
} = {
  currentUser: () => null,
  isUserTechnician: () => false
}

describe('technicianRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => technicianRoleGuard(...guardParameters));

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

  it('should not grant access if current user is not technician on no refresh navigation', () => {
    const currentUserSpy = spyOn(userManagementServiceMock, 'currentUser')
    const isUserTechnicianSpy = spyOn(userManagementServiceMock, 'isUserTechnician')
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    currentUserSpy.and.returnValue(userNoTechnicianMock)
    isUserTechnicianSpy.and.returnValue(false)

    const result = TestBed.runInInjectionContext(() => technicianRoleGuard({} as any, {} as any))

    expect(result).toBeFalse()
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should grant access if current user is technician on no refresh navigation', () => {
    const currentUserSpy = spyOn(userManagementServiceMock, 'currentUser')
    const isUserTechnicianSpy = spyOn(userManagementServiceMock, 'isUserTechnician')

    currentUserSpy.and.returnValue(userTechnicianMock)
    isUserTechnicianSpy.and.returnValue(true)

    const result = TestBed.runInInjectionContext(() => technicianRoleGuard({} as any, {} as any))

    expect(result).toBeTrue()
  });

  it('should not grant access if current user is not technician on refresh navigation', fakeAsync(() => {
    const currentUserSpy = spyOn(userManagementServiceMock, 'currentUser')
    const isUserTechnicianSpy = spyOn(userManagementServiceMock, 'isUserTechnician')
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    currentUserSpy.and.returnValue(null)
    isUserTechnicianSpy.and.returnValue(false)

    const result = TestBed.runInInjectionContext(() => technicianRoleGuard({} as any, {} as any))

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


  it('should grant access if current user is technician on refresh navigation', fakeAsync(() => {
    const currentUserSpy = spyOn(userManagementServiceMock, 'currentUser')
    const isUserTechnicianSpy = spyOn(userManagementServiceMock, 'isUserTechnician')
    
    currentUserSpy.and.returnValue(null)
    isUserTechnicianSpy.and.returnValue(true)

    const result = TestBed.runInInjectionContext(() => technicianRoleGuard({} as any, {} as any))

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
