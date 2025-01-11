import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { ServiceContractManagementService } from '../../../../core/services/service-contract-management.service';
import { ServiceContractTermModel } from '../../../../core/models/entities/service-contract-term.model';
import { FieldErrorRequiredComponent } from "../../../../shared/components/form-validation/field-error-required/field-error-required.component";
import { FieldErrorIntegerNumbersComponent } from "../../../../shared/components/form-validation/field-error-integer-numbers/field-error-integer-numbers.component";

@Component({
  selector: 'app-manage-service-contract-term',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FieldErrorRequiredComponent,
    FieldErrorIntegerNumbersComponent
],
  templateUrl: './manage-service-contract-term.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageServiceContractTermComponent {
  private readonly serviceContractManagementService = inject(ServiceContractManagementService);

  public readonly dialogRef = inject(MatDialogRef<ManageServiceContractTermComponent>);
  public readonly serviceContractTermData = inject<ServiceContractTermModel>(MAT_DIALOG_DATA);

  termFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  monthsFormControl = new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d+$/)] })
  
  serviceContractTermForm = new FormGroup({
    term: this.termFormControl,
    months: this.monthsFormControl,
  })

  serviceContractTerm: ServiceContractTermModel | null = null;

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });
    
    if (this.serviceContractTermData) {
      this.serviceContractTerm = this.serviceContractTermData
      this.termFormControl.setValue(this.serviceContractTerm.term)
      this.monthsFormControl.setValue(this.serviceContractTerm.months)
    }
  }

  onSaveClick(): void {
    const formValue = this.serviceContractTermForm.value
    let serviceContractTerm = new ServiceContractTermModel(
      0,
      formValue.term,
      formValue.months,
    )

    if (this.serviceContractTermData) {
      serviceContractTerm.id = this.serviceContractTermData.id

      this.serviceContractManagementService.editServiceContractTerm(serviceContractTerm).subscribe({
        next: () => {this.dialogRef.close(true) }
      }
      )
    }
    else {
      this.serviceContractManagementService.addServiceContractTerm(serviceContractTerm).subscribe({
        next: () => { this.dialogRef.close(true) }
      }
      )
    }
  }
}
