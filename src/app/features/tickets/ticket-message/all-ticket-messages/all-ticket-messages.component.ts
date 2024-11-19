import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { UserManagementService } from '../../../../core/services/user-management.service';
import { TicketManagementService } from '../../../../core/services/ticket-management.service';
import { TicketMessageModel } from '../../../../core/models/entities/ticket-message.model';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslocoDirective } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { UserRoles } from '../../../../core/models/entities/user.model';

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
    TranslocoDirective
  ],
  templateUrl: './all-ticket-messages.component.html',
  styleUrl: './all-ticket-messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTicketMessagesComponent {
  protected readonly faArrowLeft = faArrowLeft;

  private readonly ticketManagementService = inject(TicketManagementService)
  public readonly userManagementService = inject(UserManagementService)

  private readonly cdr = inject(ChangeDetectorRef)

  @Input() ticketId!: string
  message = ''

  adminRole: string = UserRoles.Admin;
  techRole: string = UserRoles.Technician;
  clientRole: string = UserRoles.Client;
  
  ticketMessages: TicketMessageModel[] = []

  messageInterval: any
  messageIntervalTime = 30000 //30 segundos
  
  ngOnInit() {
    if(this.ticketId) {
     this.startMessageInterval()
    }
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
    this.ticketManagementService.getAllMessagesFromTicket(this.ticketId).subscribe({
      next: (ticketMessages) => {
        this.ticketMessages = ticketMessages;
        this.cdr.markForCheck()
      }
    })
  } 

  clearMessageInterval() {
    clearInterval(this.messageInterval);
  }

  send() {
    if(this.message == '') return 

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

    this.clearMessageInterval()
    this.ticketManagementService.addTicketMessage(newTicketMessage).subscribe({
      next: () => {
        this.checkMessages()
      }
    })
  }
}
