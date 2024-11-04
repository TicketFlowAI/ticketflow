import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';
import { TicketModel } from '../../../../core/models/entities/ticket.model';

@Component({
  selector: 'app-ticket-info',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './ticket-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketInfoComponent {
  readonly dialogRef = inject(MatDialogRef<TicketInfoComponent>);
  readonly ticket = inject<TicketModel>(MAT_DIALOG_DATA);

  onReturnClick(): void {
    this.dialogRef.close();
  }
}
