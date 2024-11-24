import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ServiceManagementService } from './service-management.service';
import { ServiceService } from '../api/servicios-mindsoftdev/service.service';
import { ServiceTaxService } from '../api/servicios-mindsoftdev/service-tax.service';
import { ServiceCategoryService } from '../api/servicios-mindsoftdev/service-category.service';
import { MessageService } from '../../shared/services/message.service';
import { TranslocoService } from '@jsverse/transloco';
import { ServiceModel } from '../models/entities/service.model';
import { ServiceTaxModel } from '../models/entities/service-tax.model';
import { ServiceCategoryModel } from '../models/entities/service-category.model';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { HttpResponse } from '@angular/common/http';

describe('ServiceManagementService', () => {
  let service: ServiceManagementService;
  let serviceServiceMock: jasmine.SpyObj<ServiceService>;
  let serviceTaxServiceMock: jasmine.SpyObj<ServiceTaxService>;
  let serviceCategoryServiceMock: jasmine.SpyObj<ServiceCategoryService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let translocoServiceMock: jasmine.SpyObj<TranslocoService>;

  const mockService = new ServiceModel(1, 'Service A', 1, 1, 100, 'Category A', 'Tax Description A');
  const mockServices = [mockService];

  const mockServiceTax = new ServiceTaxModel(1, 'Tax A', 10);
  const mockServiceTaxes = [mockServiceTax];

  const mockServiceCategory = new ServiceCategoryModel(1, 'Category A');
  const mockServiceCategories = [mockServiceCategory];

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('ServiceService', [
      'getServices',
      'getService',
      'createService',
      'updateService',
      'deleteService'
    ]);

    const taxSpy = jasmine.createSpyObj('ServiceTaxService', [
      'getServiceTaxes',
      'getServiceTax',
      'createServiceTax',
      'updateServiceTax',
      'deleteServiceTax'
    ]);

    const categorySpy = jasmine.createSpyObj('ServiceCategoryService', [
      'getServiceCategories',
      'getServiceCategory',
      'createServiceCategory',
      'updateServiceCategory',
      'deleteServiceCategory'
    ]);

    const messageSpy = jasmine.createSpyObj('MessageService', ['addSuccessMessage', 'addErrorMessage']);
    const translocoSpy = jasmine.createSpyObj('TranslocoService', ['translateObject']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTransloco({
          config: {
            availableLangs: ['es', 'en'],
            defaultLang: 'es',
            reRenderOnLangChange: true,
            prodMode: !isDevMode(),
          },
          loader: TranslocoHttpLoader,
        }),
        { provide: ServiceService, useValue: serviceSpy },
        { provide: ServiceTaxService, useValue: taxSpy },
        { provide: ServiceCategoryService, useValue: categorySpy },
        { provide: MessageService, useValue: messageSpy },
        { provide: TranslocoService, useValue: translocoSpy },
      ],
    });

    service = TestBed.inject(ServiceManagementService);
    serviceServiceMock = TestBed.inject(ServiceService) as jasmine.SpyObj<ServiceService>;
    serviceTaxServiceMock = TestBed.inject(ServiceTaxService) as jasmine.SpyObj<ServiceTaxService>;
    serviceCategoryServiceMock = TestBed.inject(ServiceCategoryService) as jasmine.SpyObj<ServiceCategoryService>;
    messageServiceMock = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    translocoServiceMock = TestBed.inject(TranslocoService) as jasmine.SpyObj<TranslocoService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /** Service Tests **/
  it('should get all services successfully', (done) => {
    serviceServiceMock.getServices.and.returnValue(of({ success: true, data: mockServices }));

    service.getAllServices().subscribe((services) => {
      expect(services).toEqual(mockServices);
      expect(serviceServiceMock.getServices).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting all services', (done) => {
    serviceServiceMock.getServices.and.returnValue(throwError(() => new Error('Error fetching services')));

    service.getAllServices().subscribe((services) => {
      expect(services).toEqual([]);
      expect(serviceServiceMock.getServices).toHaveBeenCalled();
      done();
    });
  });

  it('should get one service successfully', (done) => {
    serviceServiceMock.getService.and.returnValue(of({ success: true, data: mockService }));

    service.getOneService(1).subscribe((service) => {
      expect(service).toEqual(mockService);
      expect(serviceServiceMock.getService).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting one service', (done) => {
    serviceServiceMock.getService.and.returnValue(throwError(() => new Error('Error fetching one service')));

    service.getOneService(1).subscribe((service) => {
      expect(service).toBeNull();
      expect(serviceServiceMock.getService).toHaveBeenCalled();
      done();
    });
  });

  it('should add a service successfully', (done) => {
    serviceServiceMock.createService.and.returnValue(of(new HttpResponse({ status: 201 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addService(mockService).subscribe((result) => {
      expect(result).toBeTrue();
      expect(serviceServiceMock.createService).toHaveBeenCalledWith(mockService);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while adding a service', (done) => {
    serviceServiceMock.createService.and.returnValue(throwError(() => new Error('Error creating service')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addService(mockService).subscribe((result) => {
      expect(result).toBeFalse();
      expect(serviceServiceMock.createService).toHaveBeenCalledWith(mockService);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should edit a service successfully', (done) => {
    serviceServiceMock.updateService.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editService(mockService).subscribe((result) => {
      expect(result).toBeTrue();
      expect(serviceServiceMock.updateService).toHaveBeenCalledWith(mockService);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while editing a service', (done) => {
    serviceServiceMock.updateService.and.returnValue(throwError(() => new Error('Error updating service')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editService(mockService).subscribe((result) => {
      expect(result).toBeFalse();
      expect(serviceServiceMock.updateService).toHaveBeenCalledWith(mockService);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should delete a service successfully', (done) => {
    serviceServiceMock.deleteService.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteService(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(serviceServiceMock.deleteService).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while deleting a service', (done) => {
    serviceServiceMock.deleteService.and.returnValue(throwError(() => new Error('Error deleting service')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteService(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(serviceServiceMock.deleteService).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should get all service taxes successfully', (done) => {
    serviceTaxServiceMock.getServiceTaxes.and.returnValue(of({ success: true, data: mockServiceTaxes }));

    service.getAllServiceTaxes().subscribe((taxes) => {
      expect(taxes).toEqual(mockServiceTaxes);
      expect(serviceTaxServiceMock.getServiceTaxes).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting all service taxes', (done) => {
    serviceTaxServiceMock.getServiceTaxes.and.returnValue(throwError(() => new Error('Error fetching service taxes')));

    service.getAllServiceTaxes().subscribe((taxes) => {
      expect(taxes).toEqual([]);
      expect(serviceTaxServiceMock.getServiceTaxes).toHaveBeenCalled();
      done();
    });
  });

  it('should get one service tax successfully', (done) => {
    serviceTaxServiceMock.getServiceTax.and.returnValue(of({ success: true, data: mockServiceTax }));

    service.getOneServiceTax(1).subscribe((tax) => {
      expect(tax).toEqual(mockServiceTax);
      expect(serviceTaxServiceMock.getServiceTax).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should handle error while getting one service tax', (done) => {
    serviceTaxServiceMock.getServiceTax.and.returnValue(throwError(() => new Error('Error fetching service tax')));

    service.getOneServiceTax(1).subscribe((tax) => {
      expect(tax).toBeNull();
      expect(serviceTaxServiceMock.getServiceTax).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should add a service tax successfully', (done) => {
    serviceTaxServiceMock.createServiceTax.and.returnValue(of(new HttpResponse({ status: 201 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addServiceTax(mockServiceTax).subscribe((result) => {
      expect(result).toBeTrue();
      expect(serviceTaxServiceMock.createServiceTax).toHaveBeenCalledWith(mockServiceTax);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while adding a service tax', (done) => {
    serviceTaxServiceMock.createServiceTax.and.returnValue(throwError(() => new Error('Error creating service tax')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addServiceTax(mockServiceTax).subscribe((result) => {
      expect(result).toBeFalse();
      expect(serviceTaxServiceMock.createServiceTax).toHaveBeenCalledWith(mockServiceTax);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should edit a service tax successfully', (done) => {
    serviceTaxServiceMock.updateServiceTax.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editServiceTax(mockServiceTax).subscribe((result) => {
      expect(result).toBeTrue();
      expect(serviceTaxServiceMock.updateServiceTax).toHaveBeenCalledWith(mockServiceTax);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while editing a service tax', (done) => {
    serviceTaxServiceMock.updateServiceTax.and.returnValue(throwError(() => new Error('Error updating service tax')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editServiceTax(mockServiceTax).subscribe((result) => {
      expect(result).toBeFalse();
      expect(serviceTaxServiceMock.updateServiceTax).toHaveBeenCalledWith(mockServiceTax);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should delete a service tax successfully', (done) => {
    serviceTaxServiceMock.deleteServiceTax.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteServiceTax(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(serviceTaxServiceMock.deleteServiceTax).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while deleting a service tax', (done) => {
    serviceTaxServiceMock.deleteServiceTax.and.returnValue(throwError(() => new Error('Error deleting service tax')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteServiceTax(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(serviceTaxServiceMock.deleteServiceTax).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should get all service categories successfully', (done) => {
    serviceCategoryServiceMock.getServiceCategories.and.returnValue(of({ success: true, data: mockServiceCategories }));

    service.getAllServiceCategories().subscribe((categories) => {
      expect(categories).toEqual(mockServiceCategories);
      expect(serviceCategoryServiceMock.getServiceCategories).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting all service categories', (done) => {
    serviceCategoryServiceMock.getServiceCategories.and.returnValue(throwError(() => new Error('Error fetching service categories')));

    service.getAllServiceCategories().subscribe((categories) => {
      expect(categories).toEqual([]);
      expect(serviceCategoryServiceMock.getServiceCategories).toHaveBeenCalled();
      done();
    });
  });

  it('should get one service category successfully', (done) => {
    serviceCategoryServiceMock.getServiceCategory.and.returnValue(of({ success: true, data: mockServiceCategory }));

    service.getOneServiceCategory(1).subscribe((category) => {
      expect(category).toEqual(mockServiceCategory);
      expect(serviceCategoryServiceMock.getServiceCategory).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should handle error while getting one service category', (done) => {
    serviceCategoryServiceMock.getServiceCategory.and.returnValue(throwError(() => new Error('Error fetching service category')));

    service.getOneServiceCategory(1).subscribe((category) => {
      expect(category).toBeNull();
      expect(serviceCategoryServiceMock.getServiceCategory).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should add a service category successfully', (done) => {
    serviceCategoryServiceMock.createServiceCategory.and.returnValue(of(new HttpResponse({ status: 201 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addServiceCategory(mockServiceCategory).subscribe((result) => {
      expect(result).toBeTrue();
      expect(serviceCategoryServiceMock.createServiceCategory).toHaveBeenCalledWith(mockServiceCategory);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while adding a service category', (done) => {
    serviceCategoryServiceMock.createServiceCategory.and.returnValue(throwError(() => new Error('Error creating service category')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addServiceCategory(mockServiceCategory).subscribe((result) => {
      expect(result).toBeFalse();
      expect(serviceCategoryServiceMock.createServiceCategory).toHaveBeenCalledWith(mockServiceCategory);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should edit a service category successfully', (done) => {
    serviceCategoryServiceMock.updateServiceCategory.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editServiceCategory(mockServiceCategory).subscribe((result) => {
      expect(result).toBeTrue();
      expect(serviceCategoryServiceMock.updateServiceCategory).toHaveBeenCalledWith(mockServiceCategory);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while editing a service category', (done) => {
    serviceCategoryServiceMock.updateServiceCategory.and.returnValue(throwError(() => new Error('Error updating service category')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editServiceCategory(mockServiceCategory).subscribe((result) => {
      expect(result).toBeFalse();
      expect(serviceCategoryServiceMock.updateServiceCategory).toHaveBeenCalledWith(mockServiceCategory);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should delete a service category successfully', (done) => {
    serviceCategoryServiceMock.deleteServiceCategory.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteServiceCategory(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(serviceCategoryServiceMock.deleteServiceCategory).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while deleting a service category', (done) => {
    serviceCategoryServiceMock.deleteServiceCategory.and.returnValue(throwError(() => new Error('Error deleting service category')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteServiceCategory(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(serviceCategoryServiceMock.deleteServiceCategory).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
});
