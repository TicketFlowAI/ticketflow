import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';
import { UserModel } from '../../../core/models/entities/user.model';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './user-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent {
  public readonly dialogRef = inject(MatDialogRef<UserInfoComponent>);
  readonly user = inject<UserModel>(MAT_DIALOG_DATA);

  onReturnClick(): void {
    this.dialogRef.close();
  }
}
