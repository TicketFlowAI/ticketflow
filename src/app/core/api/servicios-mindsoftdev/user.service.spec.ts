import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { CustomHeadersService } from "../../utils/custom-headers.service";
import { HttpStatusCode, provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { environment } from '../../../../environments/environment';
import { IUserModelResponse } from '../../models/entities/user.model';

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
    const dummyData: IUserModelResponse = {
      success: true,
      data: {
        "id": 1,
        "name": "Mindsoft",
        "lastname": "Admin",
        "email": "info@mindsoft.biz",
        "role": "super-admin",
        "company_id": 1,
        "company_name": "Mindsoft"
      }
    }

    service.getMyUser().subscribe((response) => {
      expect(response.success).toBe(dummyData.success);
      expect(response.data).toEqual(dummyData.data);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData, { status: 200, statusText: 'OK' });
  });

  it('should update the user data and return succesfully', () => {
    const dummyData: IUserModelResponse = {
      success: true,
      data: {
        "id": 1,
        "name": "Mindsoft",
        "lastname": "Admin",
        "email": "info@mindsoft.biz",
        "role": "super-admin",
        "company_id": 1,
        "company_name": "Mindsoft"
      }
    }

    service.updateUser(dummyData).subscribe((response) => {
      expect(response.status).toEqual(HttpStatusCode.Ok);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyData);
  });
});
