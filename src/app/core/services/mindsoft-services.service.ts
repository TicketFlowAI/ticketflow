import { inject, Injectable } from '@angular/core';
import { catchError, concatMap, map, Observable, of } from 'rxjs';
import { ServiceService } from '../api/servicios-mindsoftdev/service.service';
import { ServiceTaxService } from '../api/servicios-mindsoftdev/service-tax.service';
import { ServiceCategoryService } from '../api/servicios-mindsoftdev/service-category.service';
import { IServiceApiResponse, IServiceModel, ServiceModel } from '../models/entities/service.model';
import { ServiceTaxModel } from '../models/entities/service-tax.model';
import { ServiceCategoryModel } from '../models/entities/service-category.model';

@Injectable({
  providedIn: 'root'
})
export class MindsoftServicesService {
  serviceService: ServiceService = inject(ServiceService)
  serviceTaxService: ServiceTaxService = inject(ServiceTaxService)
  serviceCategoryService: ServiceCategoryService = inject(ServiceCategoryService)

  /*
  getAllAndCompleteServices(): Observable<ServiceModel> {
    let services: ServiceModel[] = []
    let serviceTax: ServiceTaxModel[] = []
    let serviceCategories: ServiceCategoryModel[] = []

    this.serviceService.getAllServices().pipe(
      concatMap((response: IServiceApiResponse) => {
        services = response.data
        return this.serviceTaxService.getAllServiceTaxes()
      }),
      concatMap((services) => {
        services.data
      }),

    ).subscribe({
      next: () => {

      }
    })
  }
*/
  getOneCompleteService() {
    return this.serviceService.getAllServices().pipe(
      map((services) => services.data),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  getAllServices(): Observable<ServiceModel[] | null> {
    return this.serviceService.getAllServices().pipe(
      map((services) => services.data),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  getAllServiceTax(): Observable<ServiceTaxModel[] | null> {
    return this.serviceTaxService.getAllServiceTaxes().pipe(
      map((serviceTax) => serviceTax.data),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  getAllServiceCategory(): Observable<ServiceCategoryModel[] | null> {
    return this.serviceService.getAllServices().pipe(
      map((serviceCategories) => serviceCategories.data),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  getSigleService(id: number): Observable<ServiceModel | null> {
    return this.serviceService.getOneService(id).pipe(
      map((service) => service.data[0]),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  getSigleServiceTax(id: number) {
    return this.serviceTaxService.getOneServiceTax(id).pipe(
      map((serviceTax) => serviceTax.data[0]),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  getSigleServiceCategory(id: number) {
    return this.serviceCategoryService.getOneServiceCategory(id).pipe(
      map((serviceCategory) => serviceCategory.data[0]),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  addOneService(serviceModelToAdd: ServiceModel){
    return this.serviceService.createService(serviceModelToAdd).pipe(
      map(() => true),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  addOneServiceTax(serviceTaxModelToAdd: ServiceTaxModel) {
    return this.serviceTaxService.createServiceTax(serviceTaxModelToAdd).pipe(
      map(() => true),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  addOneServiceCategory(serviceCategoryModelToAdd: ServiceCategoryModel) {
    return this.serviceCategoryService.createServiceCategory(serviceCategoryModelToAdd).pipe(
      map(() => true),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  updateOneService(serviceModelToUpdate: ServiceModel) {
    return this.serviceService.updateService(serviceModelToUpdate).pipe(
      map(() => true),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  updateOneServiceTax(serviceTaxModelToUpdate: ServiceTaxModel) {
    return this.serviceTaxService.updateServiceTax(serviceTaxModelToUpdate).pipe(
      map(() => true),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  } 

  updateOneServiceCategory(serviceCategoryModelToUpdate: ServiceCategoryModel) {
    return this.serviceCategoryService.updateServiceCategory(serviceCategoryModelToUpdate).pipe(
      map(() => true),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  deleteOneService(id: number) {
    return this.serviceService.deleteService(id).pipe(
      map(() => true),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  deleteOneServiceTax(id: number) {
    return this.serviceTaxService.deleteServiceTax(id).pipe(
      map(() => true),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  deleteOneServiceCategory(id: number): Observable<boolean> {
    return this.serviceCategoryService.deleteServiceCategory(id).pipe(
      map(() => true),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }
}
