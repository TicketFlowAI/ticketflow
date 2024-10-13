import { TestBed } from '@angular/core/testing';

import { UserSessionService } from './user-sesion.service';
import {SanctumService} from "../api/servicios-mindsoftdev/sanctum.service";
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('UserSessionServiceService', () => {
  let service: UserSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UserSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
