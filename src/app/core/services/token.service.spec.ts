import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { CookieService } from 'ngx-cookie-service';

describe('TokenService', () => {
  let service: TokenService;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CookieService', ['get', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        TokenService,
        { provide: CookieService, useValue: spy }
      ]
    });

    service = TestBed.inject(TokenService);
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the token if it exists', () => {
    const mockToken = 'mock-token';
    cookieServiceSpy.get.and.returnValue(mockToken);

    const token = service.getToken();
    expect(token).toBe(mockToken);
    expect(cookieServiceSpy.get).toHaveBeenCalledWith('XSRF-TOKEN');
  });

  it('should return an empty string if no token exists', () => {
    cookieServiceSpy.get.and.returnValue('');

    const token = service.getToken();
    expect(token).toBe('');
  });

  it('should return true if the token exists', () => {
    cookieServiceSpy.get.and.returnValue('token');

    const result = service.tokenExists();
    expect(result).toBeTrue;
  });

  it('should return false if no token exists', () => {
    cookieServiceSpy.get.and.returnValue('');

    const result = service.tokenExists();
    expect(result).toBeTrue;
  });

  it('should clearall the token', () => {
    service.clearToken();
    expect(cookieServiceSpy.delete).toHaveBeenCalledWith('XSRF-TOKEN');

  });

  it('should clear all data related to the token', () => {
    service.clearAll();
    expect(cookieServiceSpy.delete).toHaveBeenCalledWith('XSRF-TOKEN');
    expect(cookieServiceSpy.delete).toHaveBeenCalledWith('mindsoft_ticketflow_session');
  });
});
