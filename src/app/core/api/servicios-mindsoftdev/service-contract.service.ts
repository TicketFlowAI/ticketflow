import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceContractService {
 //Variables
 private readonly BASE_URL = environment.apiEndpoint
 private apiServiceContract = this.BASE_URL + '/api/servicecontract'

 //Services
 http = inject(HttpClient)
 customHeadersService = inject(CustomHeadersService)

 //Methods
}
