import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { CustomHeadersService } from "../../utils/custom-headers.service";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { HttpHeaders, provideHttpClient } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../../models/requests/login.request';

describe('AuthService', () => {
  const API_URL = environment.apiEndpoint;
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const cookieSpy = jasmine.createSpyObj('CookieService', ['get', 'set', 'clearAll'])
    TestBed.configureTestingModule({
      providers: [
        CustomHeadersService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should receive Set-Cookie headers and allow cookies to be managed by the browser', () => {
    const request = new LoginRequest('dennis.ocana@mindsoft.biz', 'EstaEsUnaCotraseña123*');

    service.loginWithCredentials(request).subscribe((response) => {
      expect(response.status).toBe(200);
      expect(response.headers.has('Set-Cookie')).toBeTrue();
    });

    const req = httpMock.expectOne(API_URL + '/login');
    expect(req.request.method).toBe('POST');

    const mockHeaders = { 'Set-Cookie': 'XSRF-TOKEN=mock-token; mindsoft_ticketflow_session=mock-session-id;' };

    req.flush({}, { headers: new HttpHeaders(mockHeaders), status: 200, statusText: 'OK' });
  });

  it('should logout', () => {
    service.logout().subscribe({
      next: (response) => {
        expect(response.status).toBe(200);
      },
      error: () => fail('should have logout ')
    });

    const req = httpMock.expectOne(API_URL + '/logout')
    expect(req.request.method).toBe('POST');
    req.flush({ status: 200, statusText: 'Ok' });
  });
});
