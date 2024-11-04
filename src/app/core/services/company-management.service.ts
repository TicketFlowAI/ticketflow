import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { CompanyService } from '../api/servicios-mindsoftdev/company.service';
import { CompanyModel } from '../models/entities/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyManagementService {
  private readonly companyService = inject(CompanyService)

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
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }

  editCompany(editCompany: CompanyModel): Observable<boolean> {
    return this.companyService.updateCompany(editCompany).pipe(
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }

  deleteCompany(id: number): Observable<boolean> {
    return this.companyService.deleteCompany(id).pipe(
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }
}
