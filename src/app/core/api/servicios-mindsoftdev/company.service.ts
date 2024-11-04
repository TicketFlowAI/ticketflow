import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { Observable } from 'rxjs';
import { ICompaniesApiResponse, ICompanyApiResponse } from '../../models/entities/company.model';

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
  getCompanies(): Observable<ICompaniesApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()

    return this.http.get<ICompaniesApiResponse>(`${this.apiCompany}`, {
      headers: customHeaders,
      withCredentials: true,
    }
    );
  }

  getCompany(id: number): Observable<ICompanyApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()

    return this.http.get<ICompanyApiResponse>(`${this.apiCompany}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
    }
    );
  }

  createCompany(company: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders()

    return this.http.post<HttpResponse<any>>(`${this.apiCompany}`, company, {
      headers: customHeaders,
      withCredentials: true,
    }
    );
  }

  updateCompany(company: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders()

    return this.http.put<any>(`${this.apiCompany}/${company.id}`, company, {
      headers: customHeaders,
      withCredentials: true,
    }
    );
  }

  deleteCompany(id: number) {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()

    return this.http.delete<HttpResponse<any>>(`${this.apiCompany}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
    }
    );
  }
}
