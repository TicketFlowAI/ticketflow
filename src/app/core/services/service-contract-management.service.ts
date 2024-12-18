import { inject, Injectable } from '@angular/core';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { ServiceContractModel } from '../models/entities/service-contract.model';
import { ServiceContractService } from '../api/servicios-mindsoftdev/service-contract.service';
import { ServiceContractTermService } from '../api/servicios-mindsoftdev/service-contract-term.service';
import { ServiceContractTermModel } from '../models/entities/service-contract-term.model';
import { TranslocoService } from '@jsverse/transloco';
import { MessageService } from '../../shared/services/message.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class ServiceContractManagementService {
  private readonly serviceContractService = inject(ServiceContractService)
  private readonly serviceContractTermService = inject(ServiceContractTermService)

  private readonly messageService = inject(MessageService)
  private readonly spinnerService = inject(SpinnerService)
  private readonly translocoService = inject(TranslocoService)

  getAllServiceContracts(): Observable<ServiceContractModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});

    return this.serviceContractService.getServiceContracts().pipe(
      map((serviceContracts) => serviceContracts.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  getAllServiceContractsFromCompany(companyId: number): Observable<ServiceContractModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});
    
    return this.serviceContractService.getServiceContractsByCompany(companyId).pipe(
      map((serviceContracts) => serviceContracts.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  getOneServiceContract(id: number): Observable<ServiceContractModel | null> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});

    return this.serviceContractService.getServiceContract(id).pipe(
      map((serviceContract) => serviceContract.data),
      catchError(() => {
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  addServiceContract(newServiceContract: ServiceContractModel): Observable<boolean> {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceContractService.createServiceContract(newServiceContract).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.SERVICE-CONTRACT');
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
    )
  }

  editServiceContract(editServiceContract: ServiceContractModel): Observable<boolean> {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceContractService.updateServiceContract(editServiceContract).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.SERVICE-CONTRACT');
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
    )
  }

  deleteServiceContract(id: number): Observable<boolean> {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: false});

    return this.serviceContractService.deleteServiceContract(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.SERVICE-CONTRACT');
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
    )
  }

  getAllServiceContractTerms(): Observable<ServiceContractTermModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});

    return this.serviceContractTermService.getServiceContractTerms().pipe(
      map((serviceContracts) => serviceContracts.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  getOneServiceContractTerm(id: number): Observable<ServiceContractTermModel | null> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});

    return this.serviceContractTermService.getServiceContractTerm(id).pipe(
      map((serviceContract) => serviceContract.data),
      catchError(() => {
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  addServiceContractTerm(newServiceContractTerm: ServiceContractTermModel): Observable<boolean> {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});
    
    return this.serviceContractTermService.createServiceContractTerm(newServiceContractTerm).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.SERVICE-CONTRACT-TERM');
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
    )
  }

  editServiceContractTerm(editServiceContractTerm: ServiceContractTermModel): Observable<boolean> {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceContractTermService.updateServiceContractTerm(editServiceContractTerm).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.SERVICE-CONTRACT-TERM');
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
    )
  }

  deleteServiceContractTerm(id: number): Observable<boolean> {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.serviceContractTermService.deleteServiceContractTerm(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.SERVICE-CONTRACT-TERM');
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
    )
  }
}
