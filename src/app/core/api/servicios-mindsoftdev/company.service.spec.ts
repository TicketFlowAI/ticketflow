import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { CompanyService } from './company.service';
import { environment } from '../../../../environments/environment';
import { ICompaniesApiResponse, ICompanyApiResponse, CompanyModel } from '../../models/entities/company.model';
import { IUsersModelResponse, UserModel, UserRoles } from '../../models/entities/user.model';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpTestingController: HttpTestingController;

  const mockUsersResponse: IUsersModelResponse = {
    success: true,
    data: [
      new UserModel(1, 'John', 'Doe', 'john.doe@example.com', 1, UserRoles.Admin, 'Company A', '', 1),
      new UserModel(2, 'Jane', 'Smith', 'jane.smith@example.com', 2, UserRoles.Technician, 'Company B', '', 0),
    ],
  };
  
  const mockCompaniesResponse: ICompaniesApiResponse = {
    success: true,
    data: [
      new CompanyModel(1, 'Company A', '123456', 'contact@companya.com', '123-456-7890', 'State A', 'City A', 'Address A'),
      new CompanyModel(2, 'Company B', '654321', 'contact@companyb.com', '098-765-4321', 'State B', 'City B', 'Address B'),
    ],
  };

  const mockCompanyResponse: ICompanyApiResponse = {
    success: true,
    data: new CompanyModel(1, 'Company A', '123456', 'contact@companya.com', '123-456-7890', 'State A', 'City A', 'Address A'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService],
    });
    service = TestBed.inject(CompanyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get companies', () => {
    service.getCompanies().subscribe((response) => {
      expect(response).toEqual(mockCompaniesResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/companies`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCompaniesResponse);
  });

  it('should get a single company by ID', () => {
    const companyId = 1;

    service.getCompany(companyId).subscribe((response) => {
      expect(response).toEqual(mockCompanyResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/companies/${companyId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCompanyResponse);
  });

  it('should create a company', () => {
    const newCompany = new CompanyModel(0, 'Company C', '987654', 'contact@companyc.com', '111-222-3333', 'State C', 'City C', 'Address C');

    service.createCompany(newCompany).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/companies`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCompany);

    req.flush(null, { status: 201, statusText: 'Created' });
  });

  it('should update a company', () => {
    const updatedCompany = new CompanyModel(1, 'Updated Company', '123456', 'updated@company.com', '999-888-7777', 'Updated State', 'Updated City', 'Updated Address');

    service.updateCompany(updatedCompany).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/companies/${updatedCompany.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCompany);

    req.flush(new HttpResponse({ status: 200, statusText: 'OK' }));
  });

  it('should delete a company by ID', () => {
    const companyId = 1;

    service.deleteCompany(companyId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/companies/${companyId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(new HttpResponse({ status: 200, statusText: 'OK' }));
  });

  it('should get users for a specific company by company ID', () => {
    const companyId = 1;
  
    service.getCompanyUsers(companyId).subscribe((response) => {
      expect(response).toEqual(mockUsersResponse);
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/companies/${companyId}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsersResponse);
  });

  it('should handle error when getting users for a specific company', () => {
    const companyId = 1;
  
    service.getCompanyUsers(companyId).subscribe(
      () => fail('should have failed with a 404 error'),
      (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    );
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/companies/${companyId}/users`);
    expect(req.request.method).toBe('GET');
    req.flush('404 error', { status: 404, statusText: 'Not Found' });
  });

  it('should get deleted companies', () => {
    service.getDeletedCompanies().subscribe((response) => {
      expect(response).toEqual(mockCompaniesResponse);
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/companies/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCompaniesResponse);
  });

  it('should handle error when getting deleted companies', () => {
    service.getDeletedCompanies().subscribe(
      () => fail('should have failed with a 500 error'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/companies/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush('500 error', { status: 500, statusText: 'Internal Server Error' });
  });
  
  it('should restore a deleted company by ID', () => {
    const companyId = 3;
  
    service.restoreCompany(companyId).subscribe((response) => {
      expect(response.status).toBe(200);
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/companies/${companyId}/restore`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBeNull();
  
    req.flush(new HttpResponse({ status: 200, statusText: 'OK' }));
  });

  it('should handle error when restoring a deleted company', () => {
    const companyId = 3;
  
    service.restoreCompany(companyId).subscribe(
      () => fail('should have failed with a 400 error'),
      (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      }
    );
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/companies/${companyId}/restore`);
    expect(req.request.method).toBe('PUT');
    req.flush('400 error', { status: 400, statusText: 'Bad Request' });
  });
  
});
