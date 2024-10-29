import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
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

@Component({
  selector: 'app-manage-service-contract',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './manage-service-contract.component.html',
  styleUrl: './manage-service-contract.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageServiceContractComponent {
  private serviceContractManagementService = inject(ServiceContractManagementService);
  private serviceManagementService = inject(ServiceManagementService);
  private companyManagementService = inject(CompanyManagementService);
  private cdr = inject(ChangeDetectorRef);

  readonly dialogRef = inject(MatDialogRef<ManageServiceContractComponent>);
  readonly serviceContractData = inject<ServiceContractModel>(MAT_DIALOG_DATA);

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
    if (this.serviceContractData) {
      this.serviceContract = this.serviceContractData
      this.companyFormControl.setValue(this.serviceContract.company_id)
      this.serviceFormControl.setValue(this.serviceContract.service_id)
      this.serviceContactTermFormControl.setValue(this.serviceContract.service_term_id);
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

    if (this.serviceContractData) {
      serviceContract.id = this.serviceContractData.id

      this.serviceContractManagementService.editServiceContract(serviceContract).subscribe({
        next: (edited) => {
          console.log('Response:', edited)
        }
      }
      )
    }
    else {
      this.serviceContractManagementService.addServiceContract(serviceContract).subscribe({
        next: (created) => {
          console.log('Response:', created)
        }
      }
      )
    }
  }
}
