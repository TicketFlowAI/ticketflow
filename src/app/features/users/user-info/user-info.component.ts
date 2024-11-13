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
import { CompanyManagementService } from '../../../core/services/company-management.service';
import { UserModel } from '../../../core/models/entities/user.model';
import { CompanyModel } from '../../../core/models/entities/company.model';

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
