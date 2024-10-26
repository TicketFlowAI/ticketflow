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
import { ServiceModel } from '../../../../core/models/entities/service.model';
import { ServiceManagement } from '../../../../core/services/service-management.service';
import { ServiceTaxModel } from '../../../../core/models/entities/service-tax.model';
import { ServiceCategoryModel } from '../../../../core/models/entities/service-category.model';
import { concatMap } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-service',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './manage-service.component.html',
  styleUrl: './manage-service.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageServiceComponent {
  private serviceManagementService = inject(ServiceManagement);
  readonly dialogRef = inject(MatDialogRef<ManageServiceComponent>);
  readonly serviceData = inject<ServiceModel>(MAT_DIALOG_DATA);

  descriptionFormControl = new FormControl('', [Validators.required])
  priceFormControl = new FormControl(0, [Validators.required])
  categoryFormControl = new FormControl(0, [Validators.required])
  taxFormControl = new FormControl(0, [Validators.required])

  serviceForm = new FormGroup({
    description: this.descriptionFormControl,
    price: this.priceFormControl,
    category: this.categoryFormControl,
    tax: this.taxFormControl
  })

  service: ServiceModel | null = null;
  categories: ServiceCategoryModel[] = [];
  taxes: ServiceTaxModel[] = [];

  ngOnInit(): void {
    this.serviceManagementService.getAllServiceCategories().pipe(
      concatMap(categories => {
        this.categories = categories
        return this.serviceManagementService.getAllServiceTaxes()
      })
    ).subscribe({
      next: (taxes) => {
        this.taxes = taxes;
        if (this.serviceData) {
          this.service = this.serviceData
          this.descriptionFormControl.setValue(this.service.description)
          this.priceFormControl.setValue(this.service.price)
          this.categoryFormControl.setValue(this.service.category_id);
          this.taxFormControl.setValue(this.service.tax_id);
        }
      }
    })
  }

  onSaveClick(): void {
    const formValue = this.serviceForm.value
    let service = new ServiceModel(
      0,
      formValue.category ?? 1,
      '',
      formValue.tax ?? 1,
      '',
      formValue.price ?? 0,
      formValue.description ?? '',
    )

    if (this.serviceData) {
      service.id = this.serviceData.id
      
      this.serviceManagementService.updateService(service).subscribe({
        next: (edited) => {
          console.log('Response:', edited)
        }
      }
      )
    }
    else {
      this.serviceManagementService.addService(service).subscribe({
        next: (created) => {
          console.log('Response:', created)
        }
      }
      )
    }
  }
}
