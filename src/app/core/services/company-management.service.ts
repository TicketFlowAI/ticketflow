import { inject, Injectable } from '@angular/core';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { CompanyService } from '../api/servicios-mindsoftdev/company.service';
import { CompanyModel } from '../models/entities/company.model';
import { MessageService } from '../../shared/services/message.service';
import { TranslocoService } from '@jsverse/transloco';
import { SpinnerService } from '../../shared/services/spinner.service';
import { UserModel } from '../models/entities/user.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyManagementService {
  private readonly companyService = inject(CompanyService)
  
  private readonly messageService = inject(MessageService)
  private readonly translocoService = inject(TranslocoService)
  private readonly spinnerService = inject(SpinnerService)

  getAllCompanies(): Observable<CompanyModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});
    
    return this.companyService.getCompanies().pipe(
      map((companies) => companies.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }

  getCompanyUsers(id: number): Observable<UserModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});
    return this.companyService.getCompanyUsers(id).pipe(
      map((users) => users.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }
  
  getOneCompany(id: number): Observable<CompanyModel | null> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});
    return this.companyService.getCompany(id).pipe(
      map((company) => company.data),
      catchError(() => {
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  getDeletedCompanies(): Observable<CompanyModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});
    return this.companyService.getDeletedCompanies().pipe(
      map((company) => company.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  addCompany(newCompany: CompanyModel): Observable<boolean> {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: false});
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
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
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
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
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
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  restoreDeletedCompany(id: number): Observable<boolean> {
    return this.companyService.restoreCompany(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.RESTORE.COMPANY');
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
    )
  }
}
