import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faPencil, faX, faPlus, faInfoCircle, faUsers, faMessage, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { DialogManagerService } from '../../../../core/services/dialog-manager.service';
import { RouterLink, RouterModule } from '@angular/router';
import { TicketManagementService } from '../../../../core/services/ticket-management.service';
import { TicketModel, TicketStatus } from '../../../../core/models/entities/ticket.model';
import { TicketDialogData } from '../../../../core/models/dialogs/ticket-dialog-data.model';
import { concatMap, of, tap } from 'rxjs';
import { GlobalSpinnerComponent } from "../../../../shared/components/global-spinner/global-spinner.component";
import { UserManagementService } from '../../../../core/services/user-management.service';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-all-tickets',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    TranslocoDirective,
    MatExpansionModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FaIconComponent,
    GlobalSpinnerComponent,
    MatSelectModule,
    MatTooltipModule
  ],
  templateUrl: './all-tickets.component.html',
  styleUrl: './all-tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTicketsComponent {
  protected readonly faPencil = faPencil;
  protected readonly faInfoCircle = faInfoCircle;
  protected readonly faPlus = faPlus;
  protected readonly faX = faX;
  protected readonly users = faUsers;
  protected readonly faMessage = faMessage;
  protected readonly faClipboardList = faClipboardList;

  public TicketStatus = TicketStatus

  private readonly userManagementService = inject(UserManagementService)
  private readonly ticketManagementService = inject(TicketManagementService)
  private readonly dialogManagerService = inject(DialogManagerService)

  private readonly cdr = inject(ChangeDetectorRef)
  private readonly translocoService = inject(TranslocoService)

  tickets: TicketModel[] = []
  filteredTickets: TicketModel[] = [];
  pagedTickets: TicketModel[] = [];

  pageSize = 6; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  filterText = ''; // Texto de filtro

  @ViewChild('teamHeader') teamHeaderTemplate!: TemplateRef<any>;
  @ViewChild('clientHeader') clientHeaderTemplate!: TemplateRef<any>;

  @ViewChild('adminFilters') adminFiltersTemplate!: TemplateRef<any>;
  @ViewChild('technicianFilters') technicianFiltersTemplate!: TemplateRef<any>;
  @ViewChild('clientFilters') clientFiltersTemplate!: TemplateRef<any>;

  @ViewChild('adminTickets') adminTicketsTemplate!: TemplateRef<any>;
  @ViewChild('technicianTickets') technicianTicketsTemplate!: TemplateRef<any>
  @ViewChild('clientTickets') clientTicketsTemplate!: TemplateRef<any>;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketManagementService.getAllTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.filteredTickets = this.tickets;
        this.updatePageTickets();
        this.cdr.detectChanges();
      }
    });
  }

  showHeadRowOptions(): TemplateRef<any> {
    if (this.userManagementService.isUserAdmin() || this.userManagementService.isUserTechnician()) {
      return this.teamHeaderTemplate
    }
    else {
      return this.clientHeaderTemplate
    }
  }

  showFiltersRow(): TemplateRef<any> {
    if (this.userManagementService.isUserAdmin()) {
      return this.adminFiltersTemplate
    }
    else if (this.userManagementService.isUserTechnician()) {
      return this.technicianFiltersTemplate
    }
    else {
      return this.clientFiltersTemplate
    }
  }

  showTicketsRow(): TemplateRef<any> {
    if (this.userManagementService.isUserAdmin()) {
      return this.adminTicketsTemplate
    }
    else if (this.userManagementService.isUserTechnician()) {
      return this.technicianTicketsTemplate
    }
    else {
      return this.clientTicketsTemplate
    }
  }

  onPriorityOrder(order: 'asc' | 'desc'): void {
    this.filteredTickets.sort((a, b) => {
      const aPriority = typeof a.priority === 'number' ? a.priority : Infinity;
      const bPriority = typeof b.priority === 'number' ? b.priority : Infinity;

      if (aPriority === bPriority) {
        return 0;
      }
      return order === 'asc' ? aPriority - bPriority : bPriority - aPriority;
    });
    this.updatePageTickets();
  }

  onComplexityOrder(order: 'asc' | 'desc'): void {
    this.filteredTickets.sort((a, b) => {
      const aComplexity = typeof a.complexity === 'number' ? a.complexity : Infinity;
      const bComplexity = typeof b.complexity === 'number' ? b.complexity : Infinity;

      if (aComplexity === bComplexity) {
        return 0;
      }
      return order === 'asc' ? aComplexity - bComplexity : bComplexity - aComplexity;
    });
    this.updatePageTickets();
  }

  onStatusFilter(status: number | null): void {
    if (status === null) {

      this.filteredTickets = [...this.tickets];
    } else {

      this.filteredTickets = this.tickets.filter(ticket => ticket.status === status);
    }
    this.pageIndex = 0;
    this.updatePageTickets();
  }
  onFilterChange(): void {
    const filterText = this.filterText.toLowerCase();

    this.filteredTickets = this.tickets.filter(ticket =>
      ticket.title.toLowerCase().includes(filterText) ||
      ticket.service_desc.toLowerCase().includes(filterText) ||
      ticket.user_name.toLowerCase().includes(filterText) ||
      ticket.company_name.toLowerCase().includes(filterText)
    );
    this.pageIndex = 0;
    this.updatePageTickets();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePageTickets();
  }

  private updatePageTickets(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedTickets = this.filteredTickets.slice(startIndex, endIndex);
  }

  getStatusText(status: number): string {
    let statusText: string = '';

    switch (status) {
      case TicketStatus.Closed: {
        statusText = this.translocoService.translateObject('FEATURES.TICKETS.STATUS-CLOSED');
        return statusText;
      }
      case TicketStatus.Open: {
        statusText = this.translocoService.translateObject('FEATURES.TICKETS.STATUS-OPEN');
        return statusText;
      }
      case TicketStatus.InProgress: {
        statusText = this.translocoService.translateObject('FEATURES.TICKETS.STATUS-PROGRESS');
        return statusText;
      }
      case TicketStatus.PendingSurvey: {
        statusText = this.translocoService.translateObject('FEATURES.TICKETS.STATUS-PENDING-SURVEY');
        return statusText;
      }
      default: {
        return statusText;
      }
    }
  }

  getStatusElementStyle(status: number) {
    switch (status) {
      case 0: {
        return 'red';
      }
      case 1: {
        return 'green';
      }
      case 2: {
        return 'yellow';
      }
      case 3: {
        return 'blue';;
      }
      default: {
        return;
      }
    }
  }

  openTicketInfo(ticket: TicketModel) {
    this.dialogManagerService.openTicketInfoDialog(ticket)
  }

  openTicketSurveyInfo(ticket: TicketModel) {
    this.dialogManagerService.openTicketSurveyInfoDialog(ticket)
  }

  openTicketTechnicianHistory(ticket: TicketModel) {
    this.dialogManagerService.openTicketTechnicianHistory(ticket)
  }

  openSatisfactionSurvey(ticket: TicketModel) {
    this.dialogManagerService.openTicketSurveyDialog(ticket).subscribe({
      next: (response) => {
        if (response) {
          this.loadTickets();
          // Espera de 2 segundos antes de cargar los tickets
          setTimeout(() => {
            this.loadTickets();
          }, 2000); // 2000 milisegundos = 2 segundos
        }
      }
    });
  }


  openTicketManageDialog(ticket: TicketModel | null) {
    let data: TicketDialogData = { ticket, serviceContract: null }
    this.dialogManagerService.openManageTicketDialog(data).subscribe({
      next: (response) => {
        if (response) this.loadTickets()
      }
    })
  }

  reOpenTicket(ticketId: number) {
    this.handleOpenTicket(ticketId).subscribe()
  }

  askForReassign(ticketId: number) {
    const closeMessage = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.REASSIGN-TICKET');

    this.dialogManagerService.openActionConfirmationDialog(closeMessage).pipe(
      concatMap((result) =>
        result ? this.handleReasignTicket(ticketId) : this.handleCancelDelete()
      )
    ).subscribe();
  }

  closeTicket(ticket: TicketModel) {
    const closeMessage = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.CLOSE-TICKET');

    this.dialogManagerService.openActionConfirmationDialog(closeMessage).pipe(
      concatMap((result) =>
        result ? this.handleCloseTicket(ticket) : this.handleCancelDelete()
      )
    ).subscribe();
  }

  needHumanInteraction(ticketId: number) {
    const needHumanMessage = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.NO-AI');

    this.dialogManagerService.openActionConfirmationDialog(needHumanMessage).pipe(
      concatMap((result) =>
        result ? this.handleNeedHumanTicket(ticketId) : this.handleCancelDelete()
      )
    ).subscribe();
  }

  deleteTicket(ticketId: number) {
    const deleteMessage = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.DELETE-TICKET');

    this.dialogManagerService.openActionConfirmationDialog(deleteMessage).pipe(
      concatMap((result) =>
        result ? this.handleDeleteTicket(ticketId) : this.handleCancelDelete()
      )
    ).subscribe();
  }

  private handleCloseTicket(ticket: TicketModel) {
    return this.ticketManagementService.closeTicket(ticket.id).pipe(
      tap(() => this.loadTickets())
    );
  }

  private handleReasignTicket(ticketId: number) {
    return this.ticketManagementService.reassignTicket(ticketId).pipe(
      tap(() => this.loadTickets())
    );
  }

  private handleOpenTicket(ticketId: number) {
    return this.ticketManagementService.openTicket(ticketId).pipe(
      tap(() => this.loadTickets())
    );
  }

  private handleNeedHumanTicket(ticketId: number) {
    return this.ticketManagementService.ticketNeedHumanInteraction(ticketId).pipe(
      tap(() => this.loadTickets())
    );
  }

  private handleDeleteTicket(ticketId: number) {
    return this.ticketManagementService.deleteTicket(ticketId).pipe(
      tap(() => this.loadTickets())
    );
  }

  private handleCancelDelete() {
    return of(null);
  }
}
