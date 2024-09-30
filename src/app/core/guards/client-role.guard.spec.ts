import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { clientRoleGuard } from './client-role.guard';

describe('clientRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => clientRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
