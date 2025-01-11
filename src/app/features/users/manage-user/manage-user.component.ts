import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserManagementService } from '../../../core/services/user-management.service';
import { UserModel } from '../../../core/models/entities/user.model';
import { CompanyManagementService } from '../../../core/services/company-management.service';
import { CompanyModel } from '../../../core/models/entities/company.model';
import { MatSelectModule } from '@angular/material/select';
import { UserRoleModel } from '../../../core/models/entities/user-role.model';


@Component({
  selector: 'app-manage-user',
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
  templateUrl: './manage-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageUserComponent {
  private readonly userManagementService = inject(UserManagementService);
  private readonly companyManagementService = inject(CompanyManagementService);
  private readonly cdr = inject(ChangeDetectorRef);
  public readonly dialogRef = inject(MatDialogRef<UserManagementService>);
  public readonly userData = inject<UserModel | null>(MAT_DIALOG_DATA);

  rolesInit: string[] | string = [];

  nameFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  lastnameFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  emailFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] })
  companyFormControl = new FormControl(0, { nonNullable: true, validators: [Validators.required] })
  rolesFormControl = new FormControl(this.rolesInit, { nonNullable: true, validators: [Validators.required] })

  userForm = new FormGroup({
    name: this.nameFormControl,
    lastname: this.lastnameFormControl,
    email: this.emailFormControl,
    company: this.companyFormControl,
    roles: this.rolesFormControl
  })

  companies: CompanyModel[] = []
  roles: UserRoleModel[] = []

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });

    if (this.userData) {
      this.nameFormControl.setValue(this.userData.name)
      this.lastnameFormControl.setValue(this.userData.lastname)
      this.emailFormControl.setValue(this.userData.email)
      this.companyFormControl.setValue(this.userData.company_id)

      if (this.userData.role) {
        const roleNames = Array.isArray(this.userData.role)
          ? this.userData.role // Si es un array de strings
          : [this.userData.role]; // Si es un string único
        this.rolesFormControl.setValue(roleNames);
      }
    }

    this.companyManagementService.getAllCompanies().subscribe({
      next: (companies) => {
        this.companies = companies
        this.cdr.markForCheck()
      }
    })

    this.userManagementService.getAllUserRoles().subscribe({
      next: (roles) => {
        this.roles = roles
        this.cdr.markForCheck()
      }
    })

    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });
  }
  
  onSaveClick(): void {
    const formValue = this.userForm.value
    let user = new UserModel(
      0,
      formValue.name,
      formValue.lastname,
      formValue.email,
      formValue.company,
      formValue.roles,
      ''
    )

    if (this.userData) {
      user.id = this.userData.id

      this.userManagementService.editUser(user)
        .subscribe(() => { this.dialogRef.close(true) })
    }
    else {
      var datetime: Date = new Date()
      user.password = 'Mindsoft' + datetime.getFullYear() + '#'
      this.userManagementService.addUser(user)
        .subscribe(() => { this.dialogRef.close(true) })
    }
  }
}
