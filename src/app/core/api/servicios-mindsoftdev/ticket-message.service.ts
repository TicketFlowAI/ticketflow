import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { ITicketMessageApiResponse } from '../../models/entities/ticket-message.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketMessageService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private apiTickets = this.BASE_URL + '/api/tickets'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getAllServiceTickets(): Observable<ITicketMessageApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()
    return this.http.get<ITicketMessageApiResponse>(`${this.apiTickets}`, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  getOneServiceTicket(id: number): Observable<ITicketMessageApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<ITicketMessageApiResponse>(`${this.apiTickets}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  createServiceTicket(serviceTicket: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.post<HttpResponse<any>>(`${this.apiTickets}`, serviceTicket, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  updateServiceTicket(serviceTicket: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.post<HttpResponse<any>>(`${this.apiTickets}`, serviceTicket, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  deleteServiceTicket(id: number): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.delete<HttpResponse<any>>(`${this.apiTickets}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
    })
  }
}
