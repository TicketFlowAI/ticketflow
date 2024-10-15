import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {CustomHeadersService} from "../../utils/custom-headers.service";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomHeadersService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should set de XSRF-TOKEN Cookie, and the mindsoft session Cookie when credentials are correct', () => {

  });

  it('should manage the 401 response when credentials are invalid', () => {
    pending();
  });

  it('should logout and clear all the cookies', () => {
    pending();
  });


});
