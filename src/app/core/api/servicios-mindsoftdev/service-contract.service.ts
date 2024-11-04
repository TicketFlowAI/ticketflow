import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { IServiceContractApiResponse, IServiceContractsApiResponse } from '../../models/entities/service-contract.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceContractService {
 //Variables
 private readonly BASE_URL = environment.apiEndpoint
 private readonly apiServiceContract = this.BASE_URL + '/api/servicecontracts'

 //Services
 http = inject(HttpClient)
 customHeadersService = inject(CustomHeadersService)

 //Methods
 getServiceContracts(): Observable<IServiceContractsApiResponse> {
   const customHeader = this.customHeadersService.addAppJson().getHeaders();
   return this.http.get<IServiceContractsApiResponse>(`${this.apiServiceContract}`, { headers: customHeader, withCredentials: true});
 }

 getServiceContractsByCompany(id: number): Observable<IServiceContractsApiResponse> {
  const customHeader = this.customHeadersService.addAppJson().getHeaders();
  return this.http.get<IServiceContractsApiResponse>(`${this.apiServiceContract}/bycompany/${id}`, { headers: customHeader, withCredentials: true});
}

 getServiceContract(id: number): Observable<IServiceContractApiResponse> {
   const customHeader = this.customHeadersService.addAppJson().getHeaders();
   return this.http.get<IServiceContractApiResponse>(`${this.apiServiceContract}/${id}`, { headers: customHeader, withCredentials: true});
 }

 createServiceContract(serviceContract: any): Observable<HttpResponse<any>> {
   const customHeader = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
   return this.http.post<any>(`${this.apiServiceContract}`, serviceContract, { headers: customHeader, withCredentials: true, observe: 'response'});
 }

 updateServiceContract(serviceContract: any): Observable<HttpResponse<any>> {
   const customHeader = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
   return this.http.put<any>(`${this.apiServiceContract}/${serviceContract.id}`, serviceContract ,{ headers: customHeader, withCredentials: true, observe: 'response' });
 }

 deleteServiceContract(id: number): Observable<HttpResponse<any>> {
   const customHeader = this.customHeadersService.addAppJson().getHeaders();
   return this.http.delete<any>(`${this.apiServiceContract}/${id}`, { headers: customHeader, withCredentials: true, observe: 'response' });
 }
}
