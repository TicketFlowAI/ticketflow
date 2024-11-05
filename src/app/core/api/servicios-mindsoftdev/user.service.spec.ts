import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { CustomHeadersService } from "../../utils/custom-headers.service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { environment } from '../../../../environments/environment';
import { UserModel } from '../../models/entities/user.model';

describe('UserService', () => {
  const API_URL = environment.apiEndpoint + '/api/user';
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

  it('should get the User', () => {
    const dummyData = 
    { id: 1, 
      name: "Mindsoft", 
      lastname: "Admin", 
      email: "dennis.ocana@mindsoft.biz",
      email_verified_at: null, 
      two_factor_secret: null, 
      two_factor_recovery_codes: null, 
      company: 1, 
      deleted_at: null, 
      created_at: "2024-10-06T19:17:04.000000Z", 
      updated_at: "2024-10-06T19:17:04.000000Z" 
    }

    service.getUser().subscribe((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual(dummyData);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData, { status: 200, statusText: 'OK' });
  });

  it('should update the user data and return the user updated', () => {
    const dummyData: UserModel = 
    { id: 1, 
      name: "New Name", 
      lastname: "New LastName", 
      email: "NewMail@mail.com",
      email_verified_at: null, 
      two_factor_secret: null, 
      two_factor_recovery_codes: null, 
      company: 1, 
      deleted_at: null, 
      created_at: new Date('2024-10-06T19:17:04.000000Z'), 
      updated_at: new Date() 
    }

    service.updateUser(dummyData).subscribe((userUpdated) => {
      expect(userUpdated).toEqual(dummyData);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyData);
  });
});
