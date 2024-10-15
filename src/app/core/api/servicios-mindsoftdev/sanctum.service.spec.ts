import { TestBed } from '@angular/core/testing';

import { SanctumService } from './sanctum.service';
import {HttpHeaders, provideHttpClient} from "@angular/common/http";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import { environment } from '../../../../environments/environment';

describe('SanctumService', () => {
  const API_URL = environment.apiEndpoint + '/sanctum'
  let service: SanctumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(SanctumService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the cookies and have a 204 no content response', () => {
    service.getCsrfCookie().subscribe({
      next: (response) => {
        expect(response.status).toBe(204) 
        expect(response.body).toBe({}) 
        expect(response.headers.has('Set-Cookie')).toBeTrue() 
      },
      error: () => {fail('Response wasnt 204 no content')}
    })

    let req = httpMock.expectOne(API_URL)

    const mockHeaders = { 'Set-Cookie': 'XSRF-TOKEN=mock-token; mindsoft_ticketflow_session=mock-session-id;' };
    expect(req.request.method).toBe('GET');

    req.flush({}, {headers: new HttpHeaders(mockHeaders), status: 204, statusText: 'No Content'})
  });
});
