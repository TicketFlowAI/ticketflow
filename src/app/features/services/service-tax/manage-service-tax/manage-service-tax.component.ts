import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoDirective } from '@jsverse/transloco';
import { ServiceTaxModel } from '../../../../core/models/entities/service-tax.model';
import { ServiceManagementService } from '../../../../core/services/service-management.service';

@Component({
  selector: 'app-manage-service-tax',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './manage-service-tax.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageServiceTaxComponent {
  private readonly serviceManagementService = inject(ServiceManagementService);
  private readonly dialogRef = inject(MatDialogRef<ManageServiceTaxComponent>);
  readonly serviceTaxData = inject<ServiceTaxModel>(MAT_DIALOG_DATA);

  taxDescriptionFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  taxValueFormControl = new FormControl(0, { nonNullable: true, validators: [Validators.required] })

  serviceTaxForm = new FormGroup({
    description: this.taxDescriptionFormControl,
    value: this.taxValueFormControl,
  })

  serviceTax: ServiceTaxModel | null = null;

  ngOnInit(): void {
    if (this.serviceTaxData) {
      this.serviceTax = this.serviceTaxData
      this.taxDescriptionFormControl.setValue(this.serviceTax.description)
      this.taxValueFormControl.setValue(this.serviceTax.value)
    }
  }

  onSaveClick(): void {
    const formValue = this.serviceTaxForm.value
    let serviceTax = new ServiceTaxModel(
      0,
      formValue.description,
      formValue.value,
    )

    if (this.serviceTaxData) {
      serviceTax.id = this.serviceTaxData.id
      
      this.serviceManagementService.editServiceTax(serviceTax).subscribe({
        next: () => {
          this.dialogRef.close()
        }
      }
      )
    }
    else {
      this.serviceManagementService.addServiceTax(serviceTax).subscribe({
        next: () => {
          this.dialogRef.close()
        }
      }
      )
    }
  }
}
