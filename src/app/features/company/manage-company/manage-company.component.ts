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
    DialogSpinnerComponent
],
  templateUrl: './manage-company.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageCompanyComponent {
  private readonly companyManagementService = inject(CompanyManagementService);
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

    if (this.companyData) {
      company.id = this.companyData.id
      
      this.companyManagementService.editCompany(company)
      .subscribe( () => { this.dialogRef.close() })
    }
    else {
      this.companyManagementService.addCompany(company)
      .subscribe( () => { this.dialogRef.close() })
    }
  }
}