import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faPencil, faX, faPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { DialogManagerService } from '../../../../core/services/dialog-manager.service';
import { RouterLink, RouterModule } from '@angular/router';
import { TicketManagementService } from '../../../../core/services/ticket-management.service';
import { TicketModel } from '../../../../core/models/entities/ticket.model';
import { TicketDialogData } from '../../../../core/models/dialogs/ticket-dialog-data.model';
import { concatMap, of, tap } from 'rxjs';

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

  ngOnInit(): void {
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

  openConfirmationDialog() {
    const transate = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.DELETE-TICKET');
    this.dialogManagerService.openActionConfirmationDialog(transate)
  }

  deleteTicket(ticketId: number) {
    const deleteMessage = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.DELETE-TICKET');
  
    this.dialogManagerService.openActionConfirmationDialog(deleteMessage).pipe(
      concatMap((result) =>
        result ? this.handleDeleteTicket(ticketId) : this.handleCancelDelete()
      )
    ).subscribe();
  }
  
  private handleDeleteTicket(ticketId: number) {
    return this.ticketManagementService.deleteTicket(ticketId).pipe(
      tap(() => this.loadTickets())
    );
  }
  
  private handleCancelDelete() {
    return of(null);
  }

  openTicketManageDialog(ticket: TicketModel | null) {
    let data: TicketDialogData = { ticket, serviceContract: null }
    this.dialogManagerService.openManageTicketDialog(data).subscribe(
      () => { this.loadTickets() }
    )
  }
}
