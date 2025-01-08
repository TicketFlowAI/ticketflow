import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { UserRoleModel } from '../../../../core/models/entities/user-role.model';
import { UserManagementService } from '../../../../core/services/user-management.service';
import { TranslocoDirective } from '@jsverse/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-manage-user-role',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './manage-user-role.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageUserRoleComponent {
  private readonly userManagementService = inject(UserManagementService);
  private readonly cdr = inject(ChangeDetectorRef);
  public readonly dialogRef = inject(MatDialogRef<UserManagementService>);
  public readonly userRoleData = inject<UserRoleModel | null>(MAT_DIALOG_DATA);

  nameFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  permissionsFormControl = new FormControl([''], { nonNullable: true, validators: [Validators.required] })

  userRoleForm = new FormGroup({
    name: this.nameFormControl,
    permissions: this.permissionsFormControl,
  })

  permissions: string[] = []

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });

    this.loadPermissions()

    if (this.userRoleData) {
      this.nameFormControl.setValue(this.userRoleData.name)
      this.permissionsFormControl.setValue(this.userRoleData.permissions)
    }

    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });
  }

  loadPermissions() {
    this.userManagementService.getAllPermissions().subscribe({
      next: (permissions) => {
        this.permissions = permissions
      }
    })
  }

  onSaveClick(): void {
    const formValue = this.userRoleForm.value
    let userRole = new UserRoleModel(
      0,
      formValue.name,
      formValue.permissions
    )

    if (this.userRoleData) {
      userRole.id = this.userRoleData.id
      userRole.permissions = this.userRoleData.permissions

      this.userManagementService.editUserRole(userRole)
        .subscribe(() => { this.dialogRef.close(true) })
    }
    else {
      this.userManagementService.addUserRole(userRole)
        .subscribe(() => { this.dialogRef.close(true) })
    }
  }
}
