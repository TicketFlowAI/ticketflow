import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  private readonly dialogRef = inject(MatDialogRef<UserManagementService>);
  private readonly userData = inject<UserModel>(MAT_DIALOG_DATA);

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
  user: UserModel | null = null;

  constructor() {
    this.companyManagementService.getAllCompanies().subscribe({
      next: (companies) => {
        this.companies = companies
      }
    })
  }

  ngOnInit(): void {
    if (this.userData) {
      this.user = this.userData
      this.nameFormControl.setValue(this.user.name)
      this.lastnameFormControl.setValue(this.user.lastname)
      this.emailFormControl.setValue(this.user.email)
      this.companyFormControl.setValue(this.user.company_id)
    }
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
      
      this.userManagementService.editUser(user).subscribe({
        next: (edited) => {
          console.log('Response:', edited)
        }
      }
      )
    }
    else {
      this.userManagementService.addUser(user).subscribe({
        next: (created) => {
          console.log('Response:', created)
        }
      }
      )
    }
  }
}
