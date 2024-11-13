import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
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


@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
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

  nameFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  lastnameFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  emailFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] })
  companyFormControl = new FormControl(0, { nonNullable: true, validators: [Validators.required] })

  userForm = new FormGroup({
    name: this.nameFormControl,
    lastname: this.lastnameFormControl,
    email: this.emailFormControl,
    company: this.companyFormControl,
  })

  companies: CompanyModel[] = []

  ngOnInit(): void {
    if (this.userData) {
      this.nameFormControl.setValue(this.userData.name)
      this.lastnameFormControl.setValue(this.userData.lastname)
      this.emailFormControl.setValue(this.userData.email)
      this.companyFormControl.setValue(this.userData.company_id)
    }

    this.companyManagementService.getAllCompanies().subscribe({
      next: (companies) => {
        this.companies = companies
        this.cdr.markForCheck()
      }
    })
  }

  onSaveClick(): void {
    const formValue = this.userForm.value
    let user = new UserModel(
      0,
      formValue.name,
      formValue.lastname,
      formValue.email,
      formValue.company,
      '',
      ''
    )

    if (this.userData) {
      user.id = this.userData.id
      
      this.userManagementService.editUser(user)
      .subscribe( () => { this.dialogRef.close() })
    }
    else {
      this.userManagementService.addUser(user)
      .subscribe( () => { this.dialogRef.close() })
    }
  }
}
