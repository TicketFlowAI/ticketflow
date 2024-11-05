import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { CompanyService } from '../api/servicios-mindsoftdev/company.service';
import { CompanyModel } from '../models/entities/company.model';
import { MessageService } from '../../shared/services/message.service';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root'
})
export class CompanyManagementService {
  private readonly companyService = inject(CompanyService)
  
  private readonly messageService = inject(MessageService)
  private readonly translocoService = inject(TranslocoService)

  getAllCompanies(): Observable<CompanyModel[] | []> {
    return this.companyService.getCompanies().pipe(
      map((companies) => companies.data),
      catchError(() => {
        return of([]);
      })
    )
  }

  getOneCompany(id: number): Observable<CompanyModel | null> {
    return this.companyService.getCompany(id).pipe(
      map((company) => company.data),
      catchError(() => {
        return of(null);
      })
    )
  }

  addCompany(newCompany: CompanyModel): Observable<boolean> {
    return this.companyService.createCompany(newCompany).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.COMPANY');
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

  editCompany(editCompany: CompanyModel): Observable<boolean> {
    return this.companyService.updateCompany(editCompany).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.COMPANY');
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

  deleteCompany(id: number): Observable<boolean> {
    return this.companyService.deleteCompany(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.COMPANY');
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
