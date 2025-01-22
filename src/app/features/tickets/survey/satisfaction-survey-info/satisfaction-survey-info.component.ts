import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoDirective } from '@jsverse/transloco';
import { SurveyAnswerModel, SurveyModel } from '../../../../core/models/entities/survey.model';
import { TicketModel } from '../../../../core/models/entities/ticket.model';
import { UserModel } from '../../../../core/models/entities/user.model';
import { SurveyManagementService } from '../../../../core/services/survey-management.service';
import { TicketManagementService } from '../../../../core/services/ticket-management.service';
import { UserManagementService } from '../../../../core/services/user-management.service';
import { SatisfactionSurveyComponent } from '../satisfaction-survey/satisfaction-survey.component';
import { DialogSpinnerComponent } from '../../../../shared/components/dialog-spinner/dialog-spinner.component';

@Component({
  selector: 'app-satisfaction-survey-info',
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
    DialogSpinnerComponent
  ],
  templateUrl: './satisfaction-survey-info.component.html',
  styleUrl: './satisfaction-survey-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SatisfactionSurveyInfoComponent {
  private readonly ticketManagementService = inject(TicketManagementService);
    private readonly userManagementService = inject(UserManagementService);
    private readonly surveyManagementService = inject(SurveyManagementService);
  
    private readonly cdr = inject(ChangeDetectorRef);
  
    readonly dialogRef = inject(MatDialogRef<SatisfactionSurveyComponent>);
    readonly ticket = inject<TicketModel>(MAT_DIALOG_DATA);

    surveyAnswers: SurveyAnswerModel[] = [];
  
    user: UserModel | null = this.userManagementService.currentUser()
    ngOnInit(): void {
      this.dialogRef.backdropClick().subscribe(() => {
        this.dialogRef.close(false);
      });
  
      this.surveyManagementService.getSurveyByTicketId(this.ticket.id).subscribe({
        next: (answers) => {
          if(answers.length == 0 ) {
            this.dialogRef.close()
          }
          this.surveyAnswers = answers
          this.cdr.markForCheck();
        }
      })
    }
  
    checkSelected(question_id: number, score: number) {
      const array: SurveyAnswerModel[] = this.surveyAnswers.filter(item => item.question_id === question_id && item.score === score);
      return (array.length > 0);
    }
  
    onReturnClick(): void {
      this.dialogRef.close();
    }
}
