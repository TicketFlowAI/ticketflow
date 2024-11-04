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
import { ServiceContractManagementService } from '../../../../core/services/service-contract-management.service';
import { ServiceContractTermModel } from '../../../../core/models/entities/service-contract-term.model';

@Component({
  selector: 'app-manage-service-contract-term',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './manage-service-contract-term.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageServiceContractTermComponent {
  private serviceContractManagementService = inject(ServiceContractManagementService);

  readonly dialogRef = inject(MatDialogRef<ManageServiceContractTermComponent>);
  readonly serviceContractTermData = inject<ServiceContractTermModel>(MAT_DIALOG_DATA);

  termFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  monthsFormControl = new FormControl(0, { nonNullable: true, validators: [Validators.required] })
  
  serviceContractTermForm = new FormGroup({
    term: this.termFormControl,
    months: this.monthsFormControl,
  })

  serviceContractTerm: ServiceContractTermModel | null = null;

  ngOnInit(): void {
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
        next: (edited) => {
          console.log('Response:', edited)
        }
      }
      )
    }
    else {
      this.serviceContractManagementService.addServiceContractTerm(serviceContractTerm).subscribe({
        next: (created) => {
          console.log('Response:', created)
        }
      }
      )
    }
  }
}
