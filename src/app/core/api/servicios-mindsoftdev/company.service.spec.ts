import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { CompanyService } from './company.service';
import { environment } from '../../../../environments/environment';
import { ICompaniesApiResponse, ICompanyApiResponse, CompanyModel } from '../../models/entities/company.model';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpTestingController: HttpTestingController;

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
});
