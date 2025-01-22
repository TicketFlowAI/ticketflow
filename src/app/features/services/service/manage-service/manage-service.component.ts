import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
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
import { ServiceModel } from '../../../../core/models/entities/service.model';
import { ServiceManagementService } from '../../../../core/services/service-management.service';
import { ServiceTaxModel } from '../../../../core/models/entities/service-tax.model';
import { ServiceCategoryModel } from '../../../../core/models/entities/service-category.model';
import { catchError, forkJoin, of } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FieldErrorRequiredComponent } from "../../../../shared/components/form-validation/field-error-required/field-error-required.component";
import { decimalWithDotValidator, notZeroValidator } from '../../../../shared/validators/custom-validators';
import { FieldErrorDecimalNumbersComponent } from "../../../../shared/components/form-validation/field-error-decimal-numbers/field-error-decimal-numbers.component";
import { FieldErrorRequiredSelectComponent } from "../../../../shared/components/form-validation/field-error-required-select/field-error-required-select.component";
import { DialogSpinnerComponent } from '../../../../shared/components/dialog-spinner/dialog-spinner.component';

@Component({
  selector: 'app-manage-service',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    FieldErrorRequiredComponent,
    FieldErrorDecimalNumbersComponent,
    FieldErrorRequiredSelectComponent,
    DialogSpinnerComponent
],
  templateUrl: './manage-service.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageServiceComponent {
  private readonly serviceManagementService = inject(ServiceManagementService);
  private readonly cdr = inject(ChangeDetectorRef);

  public readonly dialogRef = inject(MatDialogRef<ManageServiceComponent>);
  public readonly serviceData = inject<ServiceModel>(MAT_DIALOG_DATA);

  descriptionFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  detailsFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  priceFormControl = new FormControl(0, { nonNullable: true, validators: [Validators.required, decimalWithDotValidator] })
  categoryFormControl = new FormControl(0, { nonNullable: true, validators: [notZeroValidator] })
  taxFormControl = new FormControl(0, { nonNullable: true, validators: [notZeroValidator] })

  serviceForm = new FormGroup({
    description: this.descriptionFormControl,
    details: this.detailsFormControl,
    price: this.priceFormControl,
    category: this.categoryFormControl,
    tax: this.taxFormControl
  })

  service: ServiceModel | null = null;
  categories: ServiceCategoryModel[] = [];
  taxes: ServiceTaxModel[] = [];

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });
    
    if (this.serviceData) {
      this.service = this.serviceData
      this.descriptionFormControl.setValue(this.service.description)
      this.detailsFormControl.setValue(this.service.details)
      this.priceFormControl.setValue(this.service.price)
      this.categoryFormControl.setValue(this.service.category_id);
      this.taxFormControl.setValue(this.service.tax_id);
    }

    forkJoin({
      categories: this.serviceManagementService.getAllServiceCategories(),
      taxes: this.serviceManagementService.getAllServiceTaxes()
    }).pipe(
      catchError(() => {
        return of({ categories: [], taxes: []})
      })
    ).subscribe({
      next: ({categories, taxes}) => {
        this.categories = categories
        this.taxes = taxes

        this.cdr.detectChanges();
      }
    })
  }

  onSaveClick(): void {
    const formValue = this.serviceForm.value
    let service = new ServiceModel(
      0,
      formValue.description,
      formValue.details,
      formValue.category,
      formValue.tax,
      formValue.price,
      '',
      ''
    )

    if (this.serviceData) {
      service.id = this.serviceData.id

      this.serviceManagementService.editService(service)
      .subscribe( () => { this.dialogRef.close(true) })
    }
    else {
      this.serviceManagementService.addService(service)
      .subscribe( () => { this.dialogRef.close(true) })
    }
  }
}
