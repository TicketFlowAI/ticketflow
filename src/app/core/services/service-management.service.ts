import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ServiceService } from '../api/servicios-mindsoftdev/service.service';
import { ServiceTaxService } from '../api/servicios-mindsoftdev/service-tax.service';
import { ServiceCategoryService } from '../api/servicios-mindsoftdev/service-category.service';
import { ServiceModel } from '../models/entities/service.model';
import { ServiceTaxModel } from '../models/entities/service-tax.model';
import { ServiceCategoryModel } from '../models/entities/service-category.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagementService {
  private readonly serviceService: ServiceService = inject(ServiceService)
  private readonly serviceTaxService: ServiceTaxService = inject(ServiceTaxService)
  private readonly serviceCategoryService: ServiceCategoryService = inject(ServiceCategoryService)

  getAllServices(): Observable<ServiceModel[] | []> {
    return this.serviceService.getServices().pipe(
      map((services) => services.data),
      catchError(() => {
        return of([]);
      })
    );
  }

  getOneService(id: number): Observable<ServiceModel | null> {
    return this.serviceService.getService(id).pipe(
      map((service) => service.data),
      catchError(() => {
        return of(null);
      })
    );
  }

  addService(serviceModelToAdd: ServiceModel){
    return this.serviceService.createService(serviceModelToAdd).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  }

  editService(serviceModelToUpdate: ServiceModel) {
    return this.serviceService.updateService(serviceModelToUpdate).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  }

  deleteService(id: number) {
    return this.serviceService.deleteService(id).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  }

  getAllServiceTaxes(): Observable<ServiceTaxModel[] | []> {
    return this.serviceTaxService.getServiceTaxes().pipe(
      map((serviceTaxes) => serviceTaxes.data),
      catchError(() => {
        return of([]);
      })
    );
  }

  getOneServiceTax(id: number) {
    return this.serviceTaxService.getServiceTax(id).pipe(
      map((serviceTax) => serviceTax.data),
      catchError(() => {
        return of(null);
      })
    );
  }

  addServiceTax(serviceTaxModelToAdd: ServiceTaxModel) {
    return this.serviceTaxService.createServiceTax(serviceTaxModelToAdd).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  }

  editServiceTax(serviceTaxModelToUpdate: ServiceTaxModel) {
    return this.serviceTaxService.updateServiceTax(serviceTaxModelToUpdate).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  } 

  deleteServiceTax(id: number) {
    return this.serviceTaxService.deleteServiceTax(id).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  }

  getAllServiceCategories(): Observable<ServiceCategoryModel[] | []> {
    return this.serviceCategoryService.getServiceCategories().pipe(
      map((serviceCategories) => serviceCategories.data),
      catchError(() => {
        return of([]);
      })
    );
  }

  getOneServiceCategory(id: number) {
    return this.serviceCategoryService.getServiceCategory(id).pipe(
      map((serviceCategory) => serviceCategory.data),
      catchError(() => {
        return of(null);
      })
    );
  }

  addServiceCategory(serviceCategoryModelToAdd: ServiceCategoryModel) {
    return this.serviceCategoryService.createServiceCategory(serviceCategoryModelToAdd).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  }

  editServiceCategory(serviceCategoryModelToUpdate: ServiceCategoryModel) {
    return this.serviceCategoryService.updateServiceCategory(serviceCategoryModelToUpdate).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  }

  deleteServiceCategory(id: number): Observable<boolean> {
    return this.serviceCategoryService.deleteServiceCategory(id).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  }
}
