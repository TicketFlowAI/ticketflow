import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceTermService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private apiServiceTerm = this.BASE_URL + '/api/serviceTerms'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  
}
