import { inject, Injectable } from '@angular/core';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { ServiceService } from '../api/servicios-mindsoftdev/service.service';
import { ServiceTaxService } from '../api/servicios-mindsoftdev/service-tax.service';
import { ServiceCategoryService } from '../api/servicios-mindsoftdev/service-category.service';
import { ServiceModel } from '../models/entities/service.model';
import { ServiceTaxModel } from '../models/entities/service-tax.model';
import { ServiceCategoryModel } from '../models/entities/service-category.model';
import { MessageService } from '../../shared/services/message.service';
import { TranslocoService } from '@jsverse/transloco';
import { SpinnerService } from '../../shared/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagementService {
  private readonly serviceService: ServiceService = inject(ServiceService)
  private readonly serviceTaxService: ServiceTaxService = inject(ServiceTaxService)
  private readonly serviceCategoryService: ServiceCategoryService = inject(ServiceCategoryService)

  private readonly messageService = inject(MessageService)
  private readonly spinnerService = inject(SpinnerService)

  private readonly translocoService = inject(TranslocoService)

  getAllServices(): Observable<ServiceModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});
    
    return this.serviceService.getServices().pipe(
      map((services) => services.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }

  getOneService(id: number): Observable<ServiceModel | null> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});

    return this.serviceService.getService(id).pipe(
      map((service) => service.data),
      catchError(() => {
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }

  getDeletedServices(): Observable<ServiceModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});
    
    return this.serviceService.getDeletedServices().pipe(
      map((services) => services.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }

  addService(serviceModelToAdd: ServiceModel){
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceService.createService(serviceModelToAdd).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.SERVICE');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }

  editService(serviceModelToUpdate: ServiceModel) {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceService.updateService(serviceModelToUpdate).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.SERVICE');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }

  deleteService(id: number) {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceService.deleteService(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.SERVICE');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }

  restoreService(id: number) {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceService.restoreService(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.RESTORE.SERVICE');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.RESTORE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }

  getAllServiceTaxes(): Observable<ServiceTaxModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});

    return this.serviceTaxService.getServiceTaxes().pipe(
      map((serviceTaxes) => serviceTaxes.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }

  getOneServiceTax(id: number) {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});

    return this.serviceTaxService.getServiceTax(id).pipe(
      map((serviceTax) => serviceTax.data),
      catchError(() => {
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }

  getDeletedServiceTaxes(): Observable<ServiceTaxModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});

    return this.serviceTaxService.getDeletedServiceTaxes().pipe(
      map((serviceTaxes) => serviceTaxes.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }

  addServiceTax(serviceTaxModelToAdd: ServiceTaxModel) {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceTaxService.createServiceTax(serviceTaxModelToAdd).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.SERVICE-TAX');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }

  editServiceTax(serviceTaxModelToUpdate: ServiceTaxModel) {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceTaxService.updateServiceTax(serviceTaxModelToUpdate).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.SERVICE-TAX');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  } 

  deleteServiceTax(id: number) {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceTaxService.deleteServiceTax(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.SERVICE-TAX');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }

  restoreServiceTax(id: number) {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceTaxService.restoreServiceTax(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.RESTORE.SERVICE-TAX');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.RESTORE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }

  getAllServiceCategories(): Observable<ServiceCategoryModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});

    return this.serviceCategoryService.getServiceCategories().pipe(
      map((serviceCategories) => serviceCategories.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }

  getOneServiceCategory(id: number) {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});

    return this.serviceCategoryService.getServiceCategory(id).pipe(
      map((serviceCategory) => serviceCategory.data),
      catchError(() => {
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }

  getDeletedServiceCategories(): Observable<ServiceCategoryModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});

    return this.serviceCategoryService.getDeletedServiceCategories().pipe(
      map((serviceCategories) => serviceCategories.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }

  addServiceCategory(serviceCategoryModelToAdd: ServiceCategoryModel) {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceCategoryService.createServiceCategory(serviceCategoryModelToAdd).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.SERVICE-CATEGORY');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }

  editServiceCategory(serviceCategoryModelToUpdate: ServiceCategoryModel) {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceCategoryService.updateServiceCategory(serviceCategoryModelToUpdate).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.SERVICE-CATEGORY');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }

  deleteServiceCategory(id: number): Observable<boolean> {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceCategoryService.deleteServiceCategory(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.SERVICE-CATEGORY');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }

  restoreServiceCategory(id: number): Observable<boolean> {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceCategoryService.restoreServiceCategory(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.RESTORE-CATEGORY');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.RESTORE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }
}
