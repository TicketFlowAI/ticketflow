import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ServiceContractModel } from '../models/entities/service-contract.model';
import { ServiceContractService } from '../api/servicios-mindsoftdev/service-contract.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceContractManagerService {
  private serviceContractService = inject(ServiceContractService)

  getAllServiceContracts(): Observable<ServiceContractModel[] | []> {
    return this.serviceContractService.getServiceContracts().pipe(
      map((serviceContracts) => serviceContracts.data),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    )
  }

  getOneServiceContract(id: number): Observable<ServiceContractModel | null> {
    return this.serviceContractService.getServiceContract(id).pipe(
      map((serviceContract) => serviceContract.data),
      catchError((error) => {
        console.log(error);
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
}
