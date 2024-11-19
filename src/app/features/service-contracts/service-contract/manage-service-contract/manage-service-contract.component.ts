import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { catchError, forkJoin, of } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoDirective } from '@jsverse/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ServiceModel } from '../../../../core/models/entities/service.model';
import { ServiceManagementService } from '../../../../core/services/service-management.service';
import { ServiceContractManagementService } from '../../../../core/services/service-contract-management.service';
import { CompanyManagementService } from '../../../../core/services/company-management.service';
import { ServiceContractModel } from '../../../../core/models/entities/service-contract.model';
import { CompanyModel } from '../../../../core/models/entities/company.model';
import { ServiceContractTermModel } from '../../../../core/models/entities/service-contract-term.model';
import { ServiceContractDialogData } from '../../../../core/models/dialogs/service-contact-dialog-data.model';

@Component({
  selector: 'app-manage-service-contract',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './manage-service-contract.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageServiceContractComponent {
  private readonly serviceContractManagementService = inject(ServiceContractManagementService);
  private readonly serviceManagementService = inject(ServiceManagementService);
  private readonly companyManagementService = inject(CompanyManagementService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly dialogRef = inject(MatDialogRef<ManageServiceContractComponent>);
  readonly data = inject<ServiceContractDialogData>(MAT_DIALOG_DATA);

  companyFormControl = new FormControl(0, { nonNullable: true, validators: [Validators.required] })
  serviceFormControl = new FormControl(0, { nonNullable: true, validators: [Validators.required] })
  serviceContactTermFormControl = new FormControl(0, { nonNullable: true, validators: [Validators.required] })

  serviceContractForm = new FormGroup({
    company: this.companyFormControl,
    service: this.serviceFormControl,
    serviceContractTerm: this.serviceContactTermFormControl
  })

  serviceContract: ServiceContractModel | null = null;
  companies: CompanyModel[] = [];
  services: ServiceModel[] = [];
  serviceContractTerms: ServiceContractTermModel[] = [];


  ngOnInit(): void {
    if (this.data.serviceContract) {
      this.serviceContract = this.data.serviceContract
      this.companyFormControl.setValue(this.data.serviceContract.company_id)
      this.serviceFormControl.setValue(this.data.serviceContract.service_id)
      this.serviceContactTermFormControl.setValue(this.data.serviceContract.service_term_id);
    }

    if (this.data.companyId) {
      this.companyFormControl.setValue(this.data.companyId)
    }

    forkJoin({
      companies: this.companyManagementService.getAllCompanies(),
      services: this.serviceManagementService.getAllServices(),
      serviceContractTerms: this.serviceContractManagementService.getAllServiceContractTerms()
    }).pipe(
      catchError(() => {
        return of({ companies: [], services: [], serviceContractTerms: [] });
      })
    ).subscribe({
      next: ({ companies, services, serviceContractTerms }) => {
        this.companies = companies;
        this.services = services;
        this.serviceContractTerms = serviceContractTerms;
        this.cdr.detectChanges();
      }
    })
  }

  onSaveClick(): void {
    const formValue = this.serviceContractForm.value
    let serviceContract = new ServiceContractModel(
      0,
      formValue.company,
      formValue.service,
      formValue.serviceContractTerm,
      '',
      '',
      ''
    )

    if (this.data.serviceContract) {
      serviceContract.id = this.data.serviceContract.id

      this.serviceContractManagementService.editServiceContract(serviceContract).subscribe({
        next: () => {
          this.dialogRef.close()
        }
      }
      )
    }
    else {
      this.serviceContractManagementService.addServiceContract(serviceContract).subscribe({
        next: () => {
          this.dialogRef.close()
        }
      }
      )
    }
  }
}
