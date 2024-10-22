import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-action-confirmation',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './action-confirmation.component.html',
  styleUrl: './action-confirmation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionConfirmationComponent {
  readonly dialogRef = inject(MatDialogRef<ActionConfirmationComponent>);
  readonly data = inject<string>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onCancelClick(): void {
    
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
