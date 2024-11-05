import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ServiceContractModel } from '../models/entities/service-contract.model';
import { ServiceContractService } from '../api/servicios-mindsoftdev/service-contract.service';
import { ServiceContractTermService } from '../api/servicios-mindsoftdev/service-contract-term.service';
import { ServiceContractTermModel } from '../models/entities/service-contract-term.model';
import { TranslocoService } from '@jsverse/transloco';
import { MessageService } from '../../shared/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceContractManagementService {
  private readonly serviceContractService = inject(ServiceContractService)
  private readonly serviceContractTermService = inject(ServiceContractTermService)

  private readonly messageService = inject(MessageService)
  private readonly translocoService = inject(TranslocoService)

  getAllServiceContracts(): Observable<ServiceContractModel[] | []> {
    return this.serviceContractService.getServiceContracts().pipe(
      map((serviceContracts) => serviceContracts.data),
      catchError(() => {
        return of([]);
      })
    )
  }

  getAllServiceContractsFromCompany(companyId: number): Observable<ServiceContractModel[] | []> {
    return this.serviceContractService.getServiceContractsByCompany(companyId).pipe(
      map((serviceContracts) => serviceContracts.data),
      catchError(() => {
        return of([]);
      })
    )
  }

  getOneServiceContract(id: number): Observable<ServiceContractModel | null> {
    return this.serviceContractService.getServiceContract(id).pipe(
      map((serviceContract) => serviceContract.data),
      catchError(() => {
        return of(null);
      })
    )
  }

  addServiceContract(newServiceContract: ServiceContractModel): Observable<boolean> {
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
      })
    )
  }

  editServiceContract(editServiceContract: ServiceContractModel): Observable<boolean> {
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
      })
    )
  }

  deleteServiceContract(id: number): Observable<boolean> {
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
      })
    )
  }

  getAllServiceContractTerms(): Observable<ServiceContractTermModel[] | []> {
    return this.serviceContractTermService.getServiceContractTerms().pipe(
      map((serviceContracts) => serviceContracts.data),
      catchError(() => {
        return of([]);
      })
    )
  }

  getOneServiceContractTerm(id: number): Observable<ServiceContractTermModel | null> {
    return this.serviceContractTermService.getServiceContractTerm(id).pipe(
      map((serviceContract) => serviceContract.data),
      catchError(() => {
        return of(null);
      })
    )
  }

  addServiceContractTerm(newServiceContractTerm: ServiceContractTermModel): Observable<boolean> {
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
      })
    )
  }

  editServiceContractTerm(editServiceContractTerm: ServiceContractTermModel): Observable<boolean> {
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
      })
    )
  }

  deleteServiceContractTerm(id: number): Observable<boolean> {
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
      })
    )
  }
}
