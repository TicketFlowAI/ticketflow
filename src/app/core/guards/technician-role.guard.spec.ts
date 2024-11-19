import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { technicianRoleGuard } from './technician-role.guard';

describe('technicianRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => technicianRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
