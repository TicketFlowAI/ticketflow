import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ServiceContractModel } from '../models/entities/service-contract.model';
import { ServiceContractService } from '../api/servicios-mindsoftdev/service-contract.service';
import { ServiceContractTermService } from '../api/servicios-mindsoftdev/service-contract-term.service';
import { ServiceContractTermModel } from '../models/entities/service-contract-term.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceContractManagementService {
  private serviceContractService = inject(ServiceContractService)
  private serviceContractTermService = inject(ServiceContractTermService)

  getAllServiceContracts(): Observable<ServiceContractModel[] | []> {
    return this.serviceContractService.getServiceContracts().pipe(
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
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }

  editServiceContract(editServiceContract: ServiceContractModel): Observable<boolean> {
    return this.serviceContractService.updateServiceContract(editServiceContract).pipe(
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }

  deleteServiceContract(id: number): Observable<boolean> {
    return this.serviceContractService.deleteServiceContract(id).pipe(
      map(() => true),
      catchError(() => {
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
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }

  editServiceContractTerm(editServiceContractTerm: ServiceContractTermModel): Observable<boolean> {
    return this.serviceContractTermService.updateServiceContractTerm(editServiceContractTerm).pipe(
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }

  deleteServiceContractTerm(id: number): Observable<boolean> {
    return this.serviceContractTermService.deleteServiceContractTerm(id).pipe(
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }
}
