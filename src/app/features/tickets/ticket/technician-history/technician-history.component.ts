import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';
import { TicketModel } from '../../../../core/models/entities/ticket.model';
import { MatIcon } from '@angular/material/icon';

import { TicketManagementService } from '../../../../core/services/ticket-management.service';
import { TicketHistoryModel } from '../../../../core/models/entities/ticket-history.model';
import { DialogSpinnerComponent } from '../../../../shared/components/dialog-spinner/dialog-spinner.component';

@Component({
  selector: 'app-technician-history',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIcon,
    DialogSpinnerComponent
  ],
  templateUrl: './technician-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicianHistoryComponent {
  public readonly dialogRef = inject(MatDialogRef<TechnicianHistoryComponent>);
  public readonly ticket = inject<TicketModel>(MAT_DIALOG_DATA);

  private ticketMangementService = inject(TicketManagementService)
  private cdr = inject(ChangeDetectorRef)

  ticketHistory: TicketHistoryModel[] = []

  ngOnInit() {
    if(this.ticket) {
      this.loadTechnicianHistory(this.ticket.id)
    }
  }

  loadTechnicianHistory(ticketId: number) {
    this.ticketMangementService.getTicketHistory(ticketId).subscribe({
      next: (history) => {
        if(history.length == 0){
          this.dialogRef.close()
          return
        } 
        this.ticketHistory = history
        this.cdr.markForCheck()
      }
    });
  }

  onReturnClick(): void {
    this.dialogRef.close();
  }
}
