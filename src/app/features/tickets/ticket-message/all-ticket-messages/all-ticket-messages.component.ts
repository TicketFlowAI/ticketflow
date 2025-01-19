import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
import { UserManagementService } from '../../../../core/services/user-management.service';
import { TicketManagementService } from '../../../../core/services/ticket-management.service';
import { TicketMessageModel } from '../../../../core/models/entities/ticket-message.model';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslocoDirective } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { UserRoles } from '../../../../core/models/entities/user.model';
import { GlobalSpinnerComponent } from "../../../../shared/components/global-spinner/global-spinner.component";
import { TicketModel } from '../../../../core/models/entities/ticket.model';

@Component({
  selector: 'app-all-ticket-messages',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    FaIconComponent,
    TranslocoDirective,
    GlobalSpinnerComponent
  ],
  templateUrl: './all-ticket-messages.component.html',
  styleUrl: './all-ticket-messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTicketMessagesComponent {
  @ViewChild('messageContainer') messageContainer!: ElementRef;

  protected readonly faArrowLeft = faArrowLeft;

  private readonly ticketManagementService = inject(TicketManagementService)
  public readonly userManagementService = inject(UserManagementService)

  private readonly cdr = inject(ChangeDetectorRef)

  @Input() ticketId!: string
  message = ''

  adminRole: string = UserRoles.Admin;
  techRole: string = UserRoles.Technician;
  clientRole: string = UserRoles.Client;

  ticket: TicketModel | null = null;
  ticketMessages: TicketMessageModel[] = []

  messageInterval: any
  messageIntervalTime = 30000 //30 segundos

  ngOnInit() {
    if (this.ticketId) {
      this.loadTicket(this.ticketId)
      this.startMessageInterval()
    }
  }

  loadTicket(ticketId: string) {
    this.ticketManagementService.getOneTicket(Number.parseInt(ticketId)).subscribe({
      next: (ticket) => {
        this.ticket = ticket;
        this.cdr.markForCheck()
      }
    })
  }

  ngOnDestroy() {
    this.clearMessageInterval()
  }

  startMessageInterval() {
    this.checkMessages()
    this.messageInterval = setInterval(() => {
      this.checkMessages()
    }, this.messageIntervalTime);
  }

  checkMessages() {
    let scroll: boolean = false
    this.ticketManagementService.getAllMessagesFromTicket(this.ticketId).subscribe({
      next: (ticketMessages) => {

        if (this.ticketMessages.length == ticketMessages.length) scroll = true;
        this.ticketMessages = ticketMessages;
        this.cdr.markForCheck()
        if (!scroll) this.scrollToBottom();
      }
    })
  }

  clearMessageInterval() {
    clearInterval(this.messageInterval);
  }

  scrollToBottom(): void {
    if (this.messageContainer) {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    }
  }

  reOpenTicket() {
    if (this.ticket) {
      this.ticketManagementService.openTicket(this.ticket.id).subscribe({
        next: () => {
          this.loadTicket(this.ticketId)
        }
      })
    }
  }	

  send() {
    if (this.message == '') return

    const newTicketMessage = new TicketMessageModel(
      0,
      parseInt(this.ticketId),
      this.message,
      this.userManagementService.currentUser()?.id,
      '',
      '',
      '',
      new Date()
    )

    this.message = '';
    this.ticketMessages.push(newTicketMessage)
    this.scrollToBottom()

    this.ticketManagementService.addTicketMessage(newTicketMessage).subscribe({
      next: () => {

        this.checkMessages()
      }
    })
  }
}
