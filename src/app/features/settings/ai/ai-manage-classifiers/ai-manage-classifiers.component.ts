import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { FieldErrorRequiredComponent } from '../../../../shared/components/form-validation/field-error-required/field-error-required.component';
import { AiManagementService } from '../../../../core/services/ai-management.service';
import { AiClassifierModel } from '../../../../core/models/entities/ai-classifier.model';
import { ManageEmailTemplateComponent } from '../../email/email-template/manage-email-template/manage-email-template.component';
import { DialogManagerService } from '../../../../core/services/dialog-manager.service';
import { DialogSpinnerComponent } from '../../../../shared/components/dialog-spinner/dialog-spinner.component';

@Component({
  selector: 'app-ai-manage-classifiers',
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
    MatButtonModule,
    FieldErrorRequiredComponent,
    DialogSpinnerComponent
  ],
  templateUrl: './ai-manage-classifiers.component.html',
  styleUrl: './ai-manage-classifiers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiManageClassifiersComponent {
  private readonly aiManagementService = inject(AiManagementService);
  private readonly dialogManagerService = inject(DialogManagerService);
  private readonly translocoService = inject(TranslocoService);
  private readonly cdr = inject(ChangeDetectorRef);

  public readonly dialogRef = inject(MatDialogRef<ManageEmailTemplateComponent>);
  public readonly aiClassifiers = inject<AiClassifierModel[]>(MAT_DIALOG_DATA);

  classifiersPri: AiClassifierModel[] = []
  classifiersHum: AiClassifierModel[] = []

  priorityClassifiers = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  priorityClassifiersHumanIntervention = new FormControl('', { nonNullable: true, validators: [Validators.required]  })

  classifiersForm = new FormGroup({
    prioClassi: this.priorityClassifiers,
    prioClassiHuman: this.priorityClassifiersHumanIntervention
  })

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });

    this.classifiersPri = this.aiClassifiers.filter(item => item.ClassifierName == 'PriorityClassifier')
    this.classifiersHum = this.aiClassifiers.filter(item => item.ClassifierName == 'PriorityClassifierHumanIntervention')
  
  }

  onSaveClick(): void {
    const formValue = this.classifiersForm.value;

    const transate = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.CLASSIFIER');
    this.dialogManagerService.openActionConfirmationDialog(transate).subscribe({
      next: (response) => {
        if (response) {
          this.aiManagementService.selectClassifiers(formValue.prioClassi ?? '', formValue.prioClassiHuman ?? '')
            .subscribe(() => { this.dialogRef.close(true) })
        }
      }
    })

  }
}
