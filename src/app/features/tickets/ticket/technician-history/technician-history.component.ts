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
import { UserManagementService } from '../../../../core/services/user-management.service';
import { UserModel } from '../../../../core/models/entities/user.model';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

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
    RouterLink
  ],
  templateUrl: './technician-history.component.html',
  styleUrl: './technician-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicianHistoryComponent {
  public readonly dialogRef = inject(MatDialogRef<TechnicianHistoryComponent>);
  public readonly ticket = inject<TicketModel>(MAT_DIALOG_DATA);

  private userManagementService = inject(UserManagementService)
  private cdr = inject(ChangeDetectorRef)

  technicians: UserModel[] = []

  ngOnInit() {
    if(this.ticket) {
      this.loadTechnicianHistory(this.ticket.id)
    }
  }

  loadTechnicianHistory(ticketId: number) {
    this.userManagementService.getAllUsers().subscribe({
      next: (users) => {
        this.technicians = users
        this.cdr.markForCheck()
      }
    });
  }

  onReturnClick(): void {
    this.dialogRef.close();
  }
}
