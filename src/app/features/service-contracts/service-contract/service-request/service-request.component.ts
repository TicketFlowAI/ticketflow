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
import { ServiceContractTermModel } from '../../../../core/models/entities/service-contract-term.model';
import { ServiceContractRequest } from '../../../../core/models/dialogs/service-contract-request-model';
import { DialogSpinnerComponent } from '../../../../shared/components/dialog-spinner/dialog-spinner.component';

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
    FieldErrorRequiredComponent,
    DialogSpinnerComponent
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
  readonly data = inject<ServiceContractRequest>(MAT_DIALOG_DATA);

  serviceFormControl = new FormControl(0, { nonNullable: true, validators: [notZeroValidator] })
  serviceTermFormControl = new FormControl(0, { nonNullable: true, validators: [notZeroValidator] })

  requestForm = new FormGroup({
    service: this.serviceFormControl,
    term: this.serviceTermFormControl
  })

  services: ServiceModel[] = [];
  terms: ServiceContractTermModel[] = [];

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });

    forkJoin({
      services: this.serviceManagementService.getAllServices(),
      contractTerms: this.serviceContractManagementService.getAllServiceContractTerms(),
    }).pipe(
      catchError(() => {
        return of({ services: [], contractTerms: [] });
      })
    ).subscribe({
      next: ({ services, contractTerms }) => {
        this.services = services;
        this.terms = contractTerms;
        this.cdr.detectChanges();
      }
    })
  }

  onSaveClick(): void {
    const formValue = this.requestForm.value
    let serviceContract = new ServiceRequest(
      this.data.companyId,
      formValue.service,
      formValue.term
    )

    this.serviceContractManagementService.newServiceContract(serviceContract).subscribe({
      next: () => {
        this.dialogRef.close(true)
      }
    }
    )
  }
}
