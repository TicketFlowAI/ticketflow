import { inject, Injectable } from '@angular/core';
import { CompanyService } from '../api/servicios-mindsoftdev/company.service';
import { CompanyModel } from '../models/entities/company.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyManagementService {
  private companyService = inject(CompanyService)

  getAllCompanies(): Observable<CompanyModel[] | []> {
    return this.companyService.getCompanies().pipe(
      map((companies) => companies.data),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    )
  }

  getCompanyById(id: number): Observable<CompanyModel[] | []> {
    return this.companyService.getCompany(id).pipe(
      map((companies) => companies.data),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    )
  }

  createCompany(newCompany: CompanyModel): Observable<boolean> {
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
