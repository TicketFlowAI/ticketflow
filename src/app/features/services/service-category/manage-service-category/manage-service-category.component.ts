import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoDirective } from '@jsverse/transloco';
import { ServiceManagementService } from '../../../../core/services/service-management.service';
import { ServiceCategoryModel } from '../../../../core/models/entities/service-category.model';
import { FieldErrorRequiredComponent } from "../../../../shared/components/form-validation/field-error-required/field-error-required.component";
import { DialogSpinnerComponent } from '../../../../shared/components/dialog-spinner/dialog-spinner.component';

@Component({
  selector: 'app-manage-service-category',
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
    FieldErrorRequiredComponent,
    DialogSpinnerComponent
],
  templateUrl: './manage-service-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageServiceCategoryComponent {
  private readonly serviceManagementService = inject(ServiceManagementService);
  public readonly dialogRef = inject(MatDialogRef<ManageServiceCategoryComponent>);
  serviceCategoryData = inject<ServiceCategoryModel | null>(MAT_DIALOG_DATA);

  categoryFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })

  serviceCategoryForm = new FormGroup({
    category: this.categoryFormControl,
  })
  
  serviceCategory: ServiceCategoryModel | null = null;

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });
    
    if (this.serviceCategoryData) {
      this.serviceCategory = this.serviceCategoryData
      this.categoryFormControl.setValue(this.serviceCategory.category)
    }
  }

  onSaveClick(): void {
    const formValue = this.serviceCategoryForm.value
    let serviceCategory = new ServiceCategoryModel(
      0,
      formValue.category,
    )

    if (this.serviceCategoryData) {
      serviceCategory.id = this.serviceCategoryData.id
      
      this.serviceManagementService.editServiceCategory(serviceCategory)
      .subscribe(() => { this.dialogRef.close(true) })
    }
    else {
      this.serviceManagementService.addServiceCategory(serviceCategory)
      .subscribe(() => {this.dialogRef.close(true)} )
    }
  }
}
