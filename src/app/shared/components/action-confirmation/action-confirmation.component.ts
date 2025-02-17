import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
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
  ],
  templateUrl: './action-confirmation.component.html',
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
