import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {CustomHeadersService} from "../../utils/custom-headers.service";
import {provideHttpClient} from "@angular/common/http";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomHeadersService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET the User', () => {
    const dummyData = { id: 1, name: "Mindsoft", lastname: "Admin", email: "dennis.ocana@mindsoft.biz", email_verified_at: null, two_factor_secret: null, two_factor_recovery_codes: null, company: 1, deleted_at: null, created_at: "2024-10-06T19:17:04.000000Z", updated_at: "2024-10-06T19:17:04.000000Z"}

    service.getUser().subscribe(data => {
      expect(data.body).toEqual(dummyData);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
    expect(service).toBeTruthy();
  });
});
