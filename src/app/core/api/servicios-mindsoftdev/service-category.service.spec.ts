import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceCategoryService } from './service-category.service';
import { environment } from '../../../../environments/environment';
import {
  IServiceCategoriesApiResponse,
  IServiceCategoryApiResponse,
  ServiceCategoryModel,
} from '../../models/entities/service-category.model';

describe('ServiceCategoryService', () => {
  let service: ServiceCategoryService;
  let httpTestingController: HttpTestingController;

  const mockCategoriesResponse: IServiceCategoriesApiResponse = {
    success: true,
    data: [
      new ServiceCategoryModel(1, 'Category A'),
      new ServiceCategoryModel(2, 'Category B'),
    ],
  };

  const mockCategoryResponse: IServiceCategoryApiResponse = {
    success: true,
    data: new ServiceCategoryModel(1, 'Category A'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceCategoryService],
    });
    service = TestBed.inject(ServiceCategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get service categories', () => {
    service.getServiceCategories().subscribe((response) => {
      expect(response).toEqual(mockCategoriesResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/categories`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategoriesResponse);
  });

  it('should get a single service category by ID', () => {
    const categoryId = 1;

    service.getServiceCategory(categoryId).subscribe((response) => {
      expect(response).toEqual(mockCategoryResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/categories/${categoryId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategoryResponse);
  });

  it('should create a service category', () => {
    const newCategory = new ServiceCategoryModel(0, 'New Category');

    service.createServiceCategory(newCategory).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/categories`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCategory);

    req.flush({}, { status: 201, statusText: 'Created' });
  });

  it('should update a service category', () => {
    const updatedCategory = new ServiceCategoryModel(1, 'Updated Category');

    service.updateServiceCategory(updatedCategory).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/categories/${updatedCategory.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCategory);

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should delete a service category by ID', () => {
    const categoryId = 1;

    service.deleteServiceCategory(categoryId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/categories/${categoryId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should get deleted service categories successfully', (done) => {
    service.getDeletedServiceCategories().subscribe({
      next: (response) => {
        expect(response).toEqual(mockCategoriesResponse);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/categories/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategoriesResponse);
  });
  
  it('should handle error when getting deleted service categories', (done) => {
    service.getDeletedServiceCategories().subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(404);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/categories/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Not Found' }, { status: 404, statusText: 'Not Found' });
  });

  it('should restore a service category successfully', (done) => {
    const categoryId = 1;
  
    service.restoreServiceCategory(categoryId).subscribe({
      next: (response) => {
        expect(response.status).toBe(200);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/categories/${categoryId}/restore`);
    expect(req.request.method).toBe('PUT');
    req.flush({}, { status: 200, statusText: 'OK' });
  });
  
  it('should handle error when restoring a service category', (done) => {
    const categoryId = 1;
  
    service.restoreServiceCategory(categoryId).subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(400);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/categories/${categoryId}/restore`);
    expect(req.request.method).toBe('PUT');
    req.flush({ message: 'Bad Request' }, { status: 400, statusText: 'Bad Request' });
  });
  
});
