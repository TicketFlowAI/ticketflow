import { inject, Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomHeadersService } from '../../utils/custom-headers.service';

@Injectable({
  providedIn: 'root'
})
export class SanctumService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private apiSanctum = this.BASE_URL + '/sanctum'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getCsrfCookie(): Observable<HttpResponse<any>>{
    const customHeader = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<any>(`${this.apiSanctum}/csrf-cookie`, { headers: customHeader, withCredentials: true, observe: 'response' })
  }
}
