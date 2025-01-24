import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { UserRoleModel } from '../../../../core/models/entities/user-role.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { UserManagementService } from '../../../../core/services/user-management.service';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-user-role-info',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './user-role-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRoleInfoComponent {
  public readonly dialogRef = inject(MatDialogRef<UserRoleInfoComponent>);
  readonly userManagementService = inject(UserManagementService);
  readonly cdr = inject(ChangeDetectorRef);
  readonly userRoleId = inject<number>(MAT_DIALOG_DATA);

  userRole: UserRoleModel | null = null
  ngOnInit() {
    this.userManagementService.getOneUserRole(this.userRoleId).subscribe({
      next: (response) => {
        this.userRole = response
        this.cdr.markForCheck()
      }
    })
  }

  onReturnClick(): void {
    this.dialogRef.close();
  }
}
