import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';
import { CompanyModel } from '../../../core/models/entities/company.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CompanyManagementService } from '../../../core/services/company-management.service';
import { DialogSpinnerComponent } from "../../../shared/components/dialog-spinner/dialog-spinner.component";
import { FieldErrorEmailComponent } from "../../../shared/components/form-validation/field-error-email/field-error-email.component";
import { FieldErrorRequiredComponent } from "../../../shared/components/form-validation/field-error-required/field-error-required.component";
import { UserManagementService } from '../../../core/services/user-management.service';

@Component({
  selector: 'app-manage-company',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    DialogSpinnerComponent,
    FieldErrorEmailComponent,
    FieldErrorRequiredComponent
],
  templateUrl: './manage-company.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageCompanyComponent {
  private readonly companyManagementService = inject(CompanyManagementService);
  private readonly userManagementService = inject(UserManagementService);
  public readonly dialogRef = inject(MatDialogRef<ManageCompanyComponent>);
  public readonly companyData = inject<CompanyModel>(MAT_DIALOG_DATA);

  nameFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  dniFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  emailFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] })
  addressFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  phoneFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  stateFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  cityFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })

  companyForm = new FormGroup({
    name: this.nameFormControl,
    dni: this.dniFormControl,
    email: this.emailFormControl,
    address: this.addressFormControl,
    phone: this.phoneFormControl,
    state: this.stateFormControl,
    city: this.cityFormControl,
  })

  company: CompanyModel | null = null;

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });
    
    if (this.companyData) {
      this.company = this.companyData
      this.nameFormControl.setValue(this.company.name)
      this.dniFormControl.setValue(this.company.idNumber)
      this.emailFormControl.setValue(this.company.contactEmail)
      this.addressFormControl.setValue(this.company.address)
      this.phoneFormControl.setValue(this.company.phone)
      this.stateFormControl.setValue(this.company.state)
      this.cityFormControl.setValue(this.company.city)
    }

    if(!this.userManagementService.isUserAdmin() && this.companyData)
    {
      this.nameFormControl.disable()
      this.dniFormControl.disable()
    } 
  }

  onSaveClick(): void {
    const formValue = this.companyForm.value
    let company = new CompanyModel(
      0,
      formValue.name,
      formValue.dni,
      formValue.email,
      formValue.address,
      formValue.phone,
      formValue.state,
      formValue.city
    )
 console.log(company)
    if (this.companyData) {
      company.id = this.companyData.id
      company.name = this.companyData.name
      company.idNumber = this.companyData.idNumber

      this.companyManagementService.editCompany(company)
      .subscribe( () => { this.dialogRef.close(true) })
    }
    else {
      this.companyManagementService.addCompany(company)
      .subscribe( () => { this.dialogRef.close(true) })
    }
  }
}