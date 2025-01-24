import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpHeaders, provideHttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../../models/requests/login.request';
import { ResetPasswordRequestModel } from '../../models/requests/password.request';

describe('AuthService', () => {
  const API_URL = environment.apiEndpoint;
  let service: AuthService;
  let httpMock: HttpTestingController;

  // Tipo extendido para simulación de respuestas
  type ILoginResponseTest = {
    [key: string]: any;
    status: number;
    headers: HttpHeaders;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomHeadersService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login with credentials and receive Set-Cookie headers', () => {
    const request = new LoginRequest('dennis.ocana@mindsoft.biz', 'password123');

    service.loginWithCredentials(request).subscribe((response: any) => {
      expect(response.status).toBe(200);
      expect(response.headers.has('Set-Cookie')).toBeTrue();
    });

    const req = httpMock.expectOne(`${API_URL}/login`);
    expect(req.request.method).toBe('POST');

    const mockHeaders = new HttpHeaders({ 'Set-Cookie': 'XSRF-TOKEN=mock-token;' });

    const mockResponse: ILoginResponseTest = {
      status: 200,
      headers: mockHeaders,
    };

    req.flush(mockResponse);
  });

  it('should logout successfully', () => {
    service.logout().subscribe((response: ILoginResponseTest) => {
      expect(response.status).toBe(200);
    });

    const req = httpMock.expectOne(`${API_URL}/logout`);
    expect(req.request.method).toBe('POST');

    const mockResponse: ILoginResponseTest = {
      status: 200,
      headers: new HttpHeaders(),
    };

    req.flush(mockResponse);
  });

  it('should request password reset successfully', () => {
    const email = 'user@example.com';

    service.requestPasswordReset(email).subscribe((response: ILoginResponseTest) => {
      expect(response.status).toBe(200);
    });

    const req = httpMock.expectOne(`${API_URL}/forgot-password`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email });

    const mockResponse: ILoginResponseTest = {
      status: 200,
      headers: new HttpHeaders(),
    };

    req.flush(mockResponse);
  });

  it('should reset password successfully', () => {
    const resetPasswordRequest: ResetPasswordRequestModel = {
      token: 'reset-token',
      password: 'newPassword123',
      email: 'user@example.com', // Agregar esta propiedad
      password_confirmation: 'newPassword123', // Agregar esta propiedad
    };
    

    service.resetPassword(resetPasswordRequest).subscribe((response: ILoginResponseTest) => {
      expect(response.status).toBe(200);
    });

    const req = httpMock.expectOne(`${API_URL}/reset-password`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(resetPasswordRequest);

    const mockResponse: ILoginResponseTest = {
      status: 200,
      headers: new HttpHeaders(),
    };

    req.flush(mockResponse);
  });

  it('should enable two-factor authentication successfully', () => {
    service.enableTwoFactorAuth().subscribe((response: ILoginResponseTest) => {
      expect(response.status).toBe(200);
    });

    const req = httpMock.expectOne(`${API_URL}/user/two-factor-authentication`);
    expect(req.request.method).toBe('POST');

    const mockResponse: ILoginResponseTest = {
      status: 200,
      headers: new HttpHeaders(),
    };

    req.flush(mockResponse);
  });

  it('should confirm two-factor authentication successfully', () => {
    const code = '123456';

    service.confirmTwoFactorAuth(code).subscribe((response: ILoginResponseTest) => {
      expect(response.status).toBe(200);
    });

    const req = httpMock.expectOne(`${API_URL}/user/confirmed-two-factor-authentication`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ code });

    const mockResponse: ILoginResponseTest = {
      status: 200,
      headers: new HttpHeaders(),
    };

    req.flush(mockResponse);
  });

  it('should disable two-factor authentication successfully', () => {
    service.disableTwoFactorAuth().subscribe((response: ILoginResponseTest) => {
      expect(response.status).toBe(200);
    });

    const req = httpMock.expectOne(`${API_URL}/user/two-factor-authentication`);
    expect(req.request.method).toBe('DELETE');

    const mockResponse: ILoginResponseTest = {
      status: 200,
      headers: new HttpHeaders(),
    };

    req.flush(mockResponse);
  });

  it('should retrieve two-factor QR code successfully', () => {
    service.getTwoFactorQrCode().subscribe((response) => {
      expect(response.svg).toBeDefined();
    });

    const req = httpMock.expectOne(`${API_URL}/user/two-factor-qr-code`);
    expect(req.request.method).toBe('GET');

    req.flush({ svg: '<svg>mock</svg>' });
  });

  it('should retrieve recovery codes successfully', () => {
    service.getRecoveryCodes().subscribe((response) => {
      expect(response.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(`${API_URL}/user/two-factor-recovery-codes`);
    expect(req.request.method).toBe('GET');

    req.flush(['code1', 'code2']);
  });

  it('should generate recovery codes successfully', () => {
    service.generateRecoveryCodes().subscribe((response) => {
      expect(response.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(`${API_URL}/user/two-factor-recovery-codes`);
    expect(req.request.method).toBe('POST');

    req.flush(['code1', 'code2']);
  });

  it('should confirm password successfully', () => {
    const payload = { password: 'password123' };

    service.confirmPassword(payload).subscribe((response: ILoginResponseTest) => {
      expect(response.status).toBe(200);
    });

    const req = httpMock.expectOne(`${API_URL}/user/confirm-password`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    const mockResponse: ILoginResponseTest = {
      status: 200,
      headers: new HttpHeaders(),
    };

    req.flush(mockResponse);
  });
});
