import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { ITicketMessageApiResponse, ITicketMessagesApiResponse } from '../../models/entities/ticket-message.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketMessageService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private apiTicketsMessage = this.BASE_URL + '/api/messages'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getTicketMessages(): Observable<ITicketMessagesApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()
    return this.http.get<ITicketMessagesApiResponse>(`${this.apiTicketsMessage}`, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  getTicketMessage(id: number): Observable<ITicketMessageApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<ITicketMessageApiResponse>(`${this.apiTicketsMessage}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  createTicketMessage(ticketMessage: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.post<HttpResponse<any>>(`${this.apiTicketsMessage}`, ticketMessage, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  updateTicketMessage(ticketMessage: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.post<HttpResponse<any>>(`${this.apiTicketsMessage}`, ticketMessage, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  deleteTicketMessage (id: number): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.delete<HttpResponse<any>>(`${this.apiTicketsMessage}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
    })
  }
}
