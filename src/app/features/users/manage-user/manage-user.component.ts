import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
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
import { DialogSpinnerComponent } from '../../../shared/components/dialog-spinner/dialog-spinner.component';
import { MessageService } from '../../../shared/services/message.service';
import { FieldErrorRequiredComponent } from '../../../shared/components/form-validation/field-error-required/field-error-required.component';
import { FieldErrorEmailComponent } from '../../../shared/components/form-validation/field-error-email/field-error-email.component';
import { FieldErrorRequiredSelectComponent } from '../../../shared/components/form-validation/field-error-required-select/field-error-required-select.component';
import { MatButtonModule } from '@angular/material/button';
import { notZeroValidator } from '../../../shared/validators/custom-validators';


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
    ReactiveFormsModule,
    DialogSpinnerComponent,
    FieldErrorRequiredComponent,
    FieldErrorEmailComponent,
    FieldErrorRequiredSelectComponent,
    MatButtonModule
  ],
  templateUrl: './manage-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageUserComponent {
  private readonly userManagementService = inject(UserManagementService);
  private readonly companyManagementService = inject(CompanyManagementService);
  private readonly cdr = inject(ChangeDetectorRef);

  private translocoService = inject(TranslocoService)
  private messageService = inject(MessageService)

  public readonly dialogRef = inject(MatDialogRef<UserManagementService>);
  public readonly userData = inject<UserModel | null>(MAT_DIALOG_DATA);

  rolesInit: string[] | string = [];

  nameFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  lastnameFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  emailFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] })
  passwordFormControl = new FormControl('', { nonNullable: true})
  confirmPasswordFormControl = new FormControl('', { nonNullable: true})
  companyFormControl = new FormControl(0, { nonNullable: true, validators: [Validators.required, notZeroValidator] })
  rolesFormControl = new FormControl(this.rolesInit, { nonNullable: true, validators: [Validators.required] })

  userForm = new FormGroup({
    name: this.nameFormControl,
    lastname: this.lastnameFormControl,
    email: this.emailFormControl,
    company: this.companyFormControl,
    roles: this.rolesFormControl,
    password: this.passwordFormControl,
    confirmedPassword: this.confirmPasswordFormControl
  })

  companies: CompanyModel[] = []
  roles: UserRoleModel[] = []

  hide = true;

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

    if(formValue.password !== formValue.confirmedPassword) {
      const translation = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.PASSWORD-MISMATCH');
      this.messageService.addWarningMessage(translation)
      return
    }
    let user = new UserModel(
      0,
      formValue.name,
      formValue.lastname,
      formValue.email,
      formValue.company,
      formValue.roles,
      '',
      formValue.password,
    )

    if (this.userData) {
      user.id = this.userData.id

      this.userManagementService.editUser(user)
        .subscribe(() => { this.dialogRef.close(true) })
    }
    else {
      this.userManagementService.addUser(user)
        .subscribe(() => { this.dialogRef.close(true) })
    }
  }
}
