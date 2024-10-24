import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { Observable } from 'rxjs';
import { CompanyModel, ICompanyApiResponse } from '../../models/entities/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private apiCompany = this.BASE_URL + '/api/companies'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getCompanies(): Observable<ICompanyApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()

    return this.http.get<ICompanyApiResponse>(`${this.apiCompany}`, {
      headers: customHeaders,
      withCredentials: true,
    }
    );
  }

  getCompany(companyId: number): Observable<ICompanyApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()

    return this.http.get<ICompanyApiResponse>(`${this.apiCompany}/${companyId}`, {
      headers: customHeaders,
      withCredentials: true,
    }
    );
  }

  updateCompany(companyToUpdate: CompanyModel): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()

    return this.http.put<any>(`${this.apiCompany}/${companyToUpdate.id}`, companyToUpdate, {
      headers: customHeaders,
      withCredentials: true,
    }
    );
  } 

  createCompany(companyToAdd: CompanyModel): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()

    return this.http.post<HttpResponse<any>>(`${this.apiCompany}`, companyToAdd, {
      headers: customHeaders,
      withCredentials: true,
    }
    );
  }

  deleteCompany(companyId: number) {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()

    return this.http.delete<HttpResponse<any>>(`${this.apiCompany}/${companyId}`, {
      headers: customHeaders,
      withCredentials: true,
    }
    );
  }
}
