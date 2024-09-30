import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { teamRoleGuard } from './team-role.guard';

describe('teamRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => teamRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
