import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoDirective } from '@jsverse/transloco';
import { SurveyManagementService } from '../../../../core/services/survey-management.service';
import { TicketManagementService } from '../../../../core/services/ticket-management.service';
import { TicketModel } from '../../../../core/models/entities/ticket.model';
import { SurveyQuestionModel } from '../../../../core/models/entities/survey-question.model';
import { SurveyAnswerModel, SurveyModel } from '../../../../core/models/entities/survey.model';
import { finalize, switchMap } from 'rxjs';
import { UserManagementService } from '../../../../core/services/user-management.service';
import { UserModel } from '../../../../core/models/entities/user.model';
import { MessageService } from '../../../../shared/services/message.service';

@Component({
  selector: 'app-satisfaction-survey',
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
    MatSelectModule
  ],
  templateUrl: './satisfaction-survey.component.html',
  styleUrl: './satisfaction-survey.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SatisfactionSurveyComponent {
  private readonly ticketManagementService = inject(TicketManagementService);
  private readonly userManagementService = inject(UserManagementService);
  private readonly surveyManagementService = inject(SurveyManagementService);

  private messageService = inject(MessageService)
  private readonly cdr = inject(ChangeDetectorRef);

  readonly dialogRef = inject(MatDialogRef<SatisfactionSurveyComponent>);
  readonly ticket = inject<TicketModel>(MAT_DIALOG_DATA);

  surveyQuestions: SurveyQuestionModel[] = [];
  surveyAnswers: SurveyAnswerModel[] = [];

  user: UserModel | null = this.userManagementService.currentUser()

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });

    this.surveyManagementService.getActiveSurveyQuestions().subscribe({
      next: (questions) => {
        this.surveyQuestions = questions

        this.surveyQuestions.forEach(question => {
          let surveyQuestion: SurveyAnswerModel = new SurveyAnswerModel()
          surveyQuestion.ticket_id = this.ticket.id
          surveyQuestion.user_id = this.user ? this.user.id : 0;
          surveyQuestion.question_id = question.id;
          surveyQuestion.score = 0

          this.surveyAnswers.push(surveyQuestion)
          this.surveyAnswers = [...this.surveyAnswers]
        })
        this.cdr.detectChanges();
      }
    })
  }

  showQuestionById(id: number) {
    const question: string = this.surveyQuestions.filter(question => question.id == id)[0]?.question ?? "";
    return question;
  }

  checkSelected(question_id: number, score: number) {
    const array: any = this.surveyAnswers.filter(item => item.question_id === question_id && item.score === score);
    return array.length > 0;
  }

  selectAnwser(question_id: number, score: number) {
    const index: number = this.surveyAnswers.findIndex(item => item.question_id == question_id)

    if (index !== -1) {
      // Actualiza el valor del objeto en ese índice
      this.surveyAnswers[index].score = score;
    }
  }

  onSendClick(): void {
    if(this.surveyAnswers.filter(item => item.score === 0).length)
    {
      this.messageService.addInfoMessage("Debe responder a todas la preguntas")
      return
    }

    let survey = new SurveyModel(
      this.surveyAnswers
    )


    this.surveyManagementService.addSurvey(survey).subscribe({
      next: (response) => {
        if(response){
          this.ticketManagementService.closeTicket(this.ticket.id).subscribe()
          this.dialogRef.close(true)
        }
      }
    });

  }
}
