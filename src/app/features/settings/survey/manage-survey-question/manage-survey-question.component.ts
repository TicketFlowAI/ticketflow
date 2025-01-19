import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoDirective } from '@jsverse/transloco';
import { FieldErrorRequiredComponent } from '../../../../shared/components/form-validation/field-error-required/field-error-required.component';
import { ManageEmailTemplateComponent } from '../../email/email-template/manage-email-template/manage-email-template.component';
import { SurveyQuestionModel } from '../../../../core/models/entities/survey-question.model';
import { SurveyManagementService } from '../../../../core/services/survey-management.service';

@Component({
  selector: 'app-manage-survey-question',
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
    MatSlideToggleModule
  ],
  templateUrl: './manage-survey-question.component.html',
  styleUrl: './manage-survey-question.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageSurveyQuestionComponent {
  private readonly surveyManagementService = inject(SurveyManagementService);
  private readonly cdr = inject(ChangeDetectorRef);

  public readonly dialogRef = inject(MatDialogRef<ManageSurveyQuestionComponent>);
  public readonly questionData = inject<SurveyQuestionModel>(MAT_DIALOG_DATA);

  questionFormControl = new FormControl('', { nonNullable: true, validators: [Validators.required] })
  
  surveyQuestionForm = new FormGroup({
    question: this.questionFormControl
  })

  active: boolean = false;

  surveyQuestion: SurveyQuestionModel | null = null;

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });

    if (this.questionData) {
      this.surveyQuestion = this.questionData
      this.questionFormControl.setValue(this.questionData.question)
      this.active = this.questionData.active == 1? true : false
    }
  }

  onSaveClick(): void {
    const formValue = this.surveyQuestionForm.value;
    let surveyQuestion = new SurveyQuestionModel(
      0,
      formValue.question,
      this.active? 1 : 0
    )

    if (this.surveyQuestion) {
      surveyQuestion.id = this.surveyQuestion.id

      this.surveyManagementService.editSurveyQuestion(surveyQuestion)
        .subscribe(() => { this.dialogRef.close(true) })
    }
    else {
      this.surveyManagementService.addSurveyQuestion(surveyQuestion)
        .subscribe(() => { this.dialogRef.close(true) })
    }
  }
}
