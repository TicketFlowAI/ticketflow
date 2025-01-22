import { inject, Injectable } from '@angular/core';
import { catchError, finalize, map, Observable, of, switchMap } from 'rxjs';
import { TicketService } from '../api/servicios-mindsoftdev/ticket.service';
import { TicketMessageService } from '../api/servicios-mindsoftdev/ticket-message.service';
import { TicketModel } from '../models/entities/ticket.model';
import { TicketMessageModel } from '../models/entities/ticket-message.model';
import { TranslocoService } from '@jsverse/transloco';
import { MessageService } from '../../shared/services/message.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { TicketHistoryModel } from '../models/entities/ticket-history.model';

@Injectable({
  providedIn: 'root'
})
export class TicketManagementService {
  private readonly ticketService = inject(TicketService)
  private readonly ticketMessageService = inject(TicketMessageService)

  private readonly messageService = inject(MessageService)
  private readonly spinnerService = inject(SpinnerService)
  private readonly translocoService = inject(TranslocoService)

  getAllTickets(): Observable<TicketModel[] | []> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: false });

    return this.ticketService.getTickets().pipe(
      map((tickets) => tickets.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
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

  getTicketHistory(id: number): Observable<TicketHistoryModel[] | []> {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
    return this.ticketService.getTicketHistory(id).pipe(
      map((ticketHistorial) => {
        if (ticketHistorial.data.length == 0) {
          const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.TICKET-HISTORY-NO-HISTORY');
          this.messageService.addInfoMessage(transate)
        }

        return ticketHistorial.data
      }),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  getDeletedTickets(): Observable<TicketModel[] | []> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.ticketService.getDeletedTickets().pipe(
      map((ticket) => ticket.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  addTicket(newTicket: TicketModel, message: string): Observable<boolean> {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
  
    return this.ticketService.createTicket(newTicket).pipe(
      switchMap((createdTicket) => {
        // Asume que `createdTicket` tiene un campo `id` que asigna al mensaje
        let ticketMessage = new TicketMessageModel()
        ticketMessage.ticket_id = createdTicket.data.id;
        ticketMessage.content = message
        ticketMessage.user_id = newTicket.user_id
  
        // Agrega el mensaje al ticket recién creado
        return this.ticketMessageService.createTicketMessage(ticketMessage).pipe(
          map(() => {
            const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.TICKET');
            this.messageService.addSuccessMessage(transate);
            return true;
          })
        );
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.ERROR');
        this.messageService.addErrorMessage(transate);
        return of(false);
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    );
  }
  
  editTicket(editTicket: TicketModel): Observable<boolean> {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.ticketService.updateTicket(editTicket).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.TICKET');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  deleteTicket(id: number): Observable<boolean> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.ticketService.deleteTicket(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.TICKET');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }


  closeTicket(id: number): Observable<boolean> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.ticketService.closeTicket(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.CLOSE-TICKET-SUCCESS');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.CLOSE-TICKET-ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  openTicket(id: number): Observable<boolean> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.ticketService.reopenTicket(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.OPEN-TICKET-SUCCESS');
        this.messageService.addSuccessMessage(transate);
        return true;
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.OPEN-TICKET-ERROR');
        this.messageService.addErrorMessage(transate);
        return of(false);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }

  restoreTicket(id: number): Observable<boolean> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.ticketService.restoreTicket(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.RESTORE.TICKET');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CLOSE-TICKET-ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  reassignTicket(id: number): Observable<boolean> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.ticketService.reassignTicket(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.REASSIGN-TICKET-SUCCESS');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.REASSIGN-TICKET-ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  ticketNeedHumanInteraction(id: number): Observable<boolean> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.ticketService.needHumanInteraction(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.NO-AI-SUCCESS');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.NO-AI-ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  getAllMessagesFromTicket(ticketId: string): Observable<TicketMessageModel[] | []> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: true });
    return this.ticketMessageService.getTicketMessages(ticketId).pipe(
      map((ticketMessages) => ticketMessages.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  addTicketMessage(newTicketMessage: TicketMessageModel): Observable<boolean> {
    return this.ticketMessageService.createTicketMessage(newTicketMessage).pipe(
      map(() => true),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      })
    )
  }
}
