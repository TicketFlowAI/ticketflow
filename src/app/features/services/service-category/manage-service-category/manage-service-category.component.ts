import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoDirective } from '@jsverse/transloco';
import { ServiceManagementService } from '../../../../core/services/service-management.service';
import { ServiceCategoryModel } from '../../../../core/models/entities/service-category.model';

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
    ReactiveFormsModule
  ],
  templateUrl: './manage-service-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageServiceCategoryComponent {
  private readonly serviceManagementService = inject(ServiceManagementService);
  private readonly dialogRef = inject(MatDialogRef<ManageServiceCategoryComponent>);
  readonly serviceCategoryData = inject<ServiceCategoryModel>(MAT_DIALOG_DATA);

  categoryFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })

  serviceCategoryForm = new FormGroup({
    category: this.categoryFormControl,
  })
  
  serviceCategory: ServiceCategoryModel | null = null;

  ngOnInit(): void {
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
      .subscribe(() => { this.dialogRef.close() })
    }
    else {
      this.serviceManagementService.addServiceCategory(serviceCategory)
      .subscribe(() => {this.dialogRef.close()} )
    }
  }
}
