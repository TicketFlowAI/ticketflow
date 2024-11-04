import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { TicketService } from '../api/servicios-mindsoftdev/ticket.service';
import { TicketMessageService } from '../api/servicios-mindsoftdev/ticket-message.service';
import { TicketModel } from '../models/entities/ticket.model';
import { TicketMessageModel } from '../models/entities/ticket-message.model';

@Injectable({
  providedIn: 'root'
})
export class TicketManagementService {
  private ticketService = inject(TicketService)
  private ticketMessageService = inject(TicketMessageService)

  getAllTickets(): Observable<TicketModel[] | []> {
    return this.ticketService.getTickets().pipe(
      map((tickets) => tickets.data),
      catchError(() => {
        return of([]);
      })
    )
  }

  getOneTicket(id: number): Observable<TicketModel | null> {
    return this.ticketService.getTicket(id).pipe(
      map((ticket) => ticket.data),
      catchError(() => {
        return of(null);
      })
    )
  }

  addTicket(newTicket: TicketModel): Observable<boolean> {
    return this.ticketService.createTicket(newTicket).pipe(
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }

  editTicket(editTicket: TicketModel): Observable<boolean> {
    return this.ticketService.updateTicket(editTicket).pipe(
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }

  deleteTicket(id: number): Observable<boolean> {
    return this.ticketService.deleteTicket(id).pipe(
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }

  getAllMessagesFromTicket(ticketId: string): Observable<TicketMessageModel[] | []> {
    return this.ticketMessageService.getTicketMessages(ticketId).pipe(
      map((ticketMessages) => ticketMessages.data),
      catchError(() => {
        return of([]);
      })
    )
  }
  
  getOneTicketMessage(id: number): Observable<TicketMessageModel | null> {
    return this.ticketMessageService.getTicketMessage(id).pipe(
      map((ticketMessage) => ticketMessage.data),
      catchError(() => {
        return of(null);
      })
    )
  }

  addTicketMessage(newTicketMessage: TicketMessageModel): Observable<boolean> {
    return this.ticketMessageService.createTicketMessage(newTicketMessage).pipe(
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }

  editTicketMessage(editTicketMessage: TicketMessageModel): Observable<boolean> {
    return this.ticketMessageService.updateTicketMessage(editTicketMessage).pipe(
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }

  deleteTicketMessage(id: number): Observable<boolean> {
    return this.ticketMessageService.deleteTicketMessage(id).pipe(
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }
}
