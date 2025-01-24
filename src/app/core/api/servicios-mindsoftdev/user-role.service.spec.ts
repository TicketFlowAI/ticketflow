import { TestBed } from '@angular/core/testing';

import { UserRoleService } from './user-role.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserRoleService', () => {
  let service: UserRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
