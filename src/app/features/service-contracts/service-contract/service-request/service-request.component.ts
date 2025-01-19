import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoDirective } from '@jsverse/transloco';
import { FieldErrorRequiredSelectComponent } from '../../../../shared/components/form-validation/field-error-required-select/field-error-required-select.component';
import { forkJoin, catchError, of } from 'rxjs';
import { ServiceContractDialogData } from '../../../../core/models/dialogs/service-contact-dialog-data.model';
import { ServiceContractModel } from '../../../../core/models/entities/service-contract.model';
import { ServiceModel } from '../../../../core/models/entities/service.model';
import { ServiceContractManagementService } from '../../../../core/services/service-contract-management.service';
import { ServiceManagementService } from '../../../../core/services/service-management.service';
import { notZeroValidator } from '../../../../shared/validators/custom-validators';
import { ServiceRequest } from '../../../../core/models/requests/service.request';
import { FieldErrorRequiredComponent } from "../../../../shared/components/form-validation/field-error-required/field-error-required.component";
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-service-request',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    FieldErrorRequiredSelectComponent,
    FieldErrorRequiredComponent
],
  templateUrl: './service-request.component.html',
  styleUrl: './service-request.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceRequestComponent {
  private readonly serviceContractManagementService = inject(ServiceContractManagementService);
  private readonly serviceManagementService = inject(ServiceManagementService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly dialogRef = inject(MatDialogRef<ServiceRequestComponent>);
  readonly data = inject<ServiceContractDialogData>(MAT_DIALOG_DATA);

  serviceFormControl = new FormControl(0, { nonNullable: true, validators: [notZeroValidator] })
  messageFormControl = new FormControl('', { nonNullable: true, validators: [notZeroValidator] })

  requestForm = new FormGroup({
    service: this.serviceFormControl,
    message: this.messageFormControl
  })

  services: ServiceModel[] = [];

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });

    if (this.data.serviceContract) {
      this.serviceFormControl.setValue(this.data.serviceContract.service_id)
    }

    forkJoin({
      services: this.serviceManagementService.getAllServices(),
    }).pipe(
      catchError(() => {
        return of({ services: [] });
      })
    ).subscribe({
      next: ({ services }) => {
        this.services = services;
        this.cdr.detectChanges();
      }
    })
  }

  onSaveClick(): void {
    const formValue = this.requestForm.value
    let serviceContract = new ServiceRequest(
      formValue.service,
      formValue.message
    )

    if (this.data.serviceContract) {
      this.serviceContractManagementService.newServiceContract(serviceContract).subscribe({
        next: () => {
          this.dialogRef.close(true)
        }
      }
      )
    }
    else {
      this.serviceContractManagementService.cancelServiceContract(serviceContract).subscribe({
        next: () => {
          this.dialogRef.close(true)
        }
      }
      )
    }
  }
}
