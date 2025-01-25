import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { noAuthGuard } from './no-auth.guard';
import { TokenService } from '../services/token.service';

describe('noAuthGuard', () => {
  let tokenServiceMock: jasmine.SpyObj<TokenService>;
  let routerMock: jasmine.SpyObj<Router>;

  const executeGuard = (...guardParameters: Parameters<typeof noAuthGuard>) =>
    TestBed.runInInjectionContext(() => noAuthGuard(...guardParameters));

  beforeEach(() => {
    tokenServiceMock = jasmine.createSpyObj('TokenService', ['tokenExists']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('should allow access if the user is not authenticated', () => {
    tokenServiceMock.tokenExists.and.returnValue(false);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBeTrue();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and redirect to home if the user is authenticated', () => {
    tokenServiceMock.tokenExists.and.returnValue(true);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
