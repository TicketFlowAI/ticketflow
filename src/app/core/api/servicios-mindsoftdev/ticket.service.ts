import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { ITicketsApiResponse, ITicketApiResponse } from '../../models/entities/ticket.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private readonly apiTickets = this.BASE_URL + '/api/tickets'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getTickets(): Observable<ITicketsApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()
    return this.http.get<ITicketsApiResponse>(`${this.apiTickets}`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getTicket(id: number): Observable<ITicketApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<ITicketApiResponse>(`${this.apiTickets}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  createTicket(ticket: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.post<any>(`${this.apiTickets}`, ticket, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  updateTicket(ticket: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.put<any>(`${this.apiTickets}/${ticket.id}`, ticket, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  deleteTicket(id: number): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.delete<any>(`${this.apiTickets}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }
}
