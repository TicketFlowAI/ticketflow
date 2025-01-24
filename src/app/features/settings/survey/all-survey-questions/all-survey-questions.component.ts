import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { GlobalSpinnerComponent } from "../../../../shared/components/global-spinner/global-spinner.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { faArrowLeft, faPencil, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { concatMap, tap, of } from 'rxjs';
import { DialogManagerService } from '../../../../core/services/dialog-manager.service';
import { SurveyManagementService } from '../../../../core/services/survey-management.service';
import { SurveyQuestionModel } from '../../../../core/models/entities/survey-question.model';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-all-survey-questions',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslocoDirective,
    FaIconComponent,
    GlobalSpinnerComponent,
    MatPaginatorModule,
    MatExpansionModule
  ],
  templateUrl: './all-survey-questions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllSurveyQuestionsComponent {
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faPencil = faPencil;
  protected readonly faPlus = faPlus;
  protected readonly faX = faX;

  private readonly surveyManagementService = inject(SurveyManagementService)
  private readonly dialogManagerService = inject(DialogManagerService)

  private readonly cdr = inject(ChangeDetectorRef)
  private readonly translocoService = inject(TranslocoService)

  surveyQuestions: SurveyQuestionModel[] = []
  filteredSurveyQuestions: SurveyQuestionModel[] = [];
  pagedSurveyQuestions: SurveyQuestionModel[] = [];

  pageSize = 6; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  filterText = ''; // Texto de filtro

  ngOnInit(): void {
    this.loadsSurveyQuestions();
  }

  loadsSurveyQuestions() {
    this.surveyManagementService.getAllSurveyQuestions().subscribe({
      next: (response) => {
        this.surveyQuestions = response;
        this.filteredSurveyQuestions = this.surveyQuestions;
        this.updatePagedSurveyQuestions();
        this.cdr.detectChanges();
      }
    });
  }

  onFilterChange(): void {
    const filterText = this.filterText.toLowerCase();

    this.filteredSurveyQuestions = this.surveyQuestions.filter(surveyQuestion =>
      surveyQuestion.question.toLowerCase().includes(filterText)
    );

    this.pageIndex = 0;
    this.updatePagedSurveyQuestions();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedSurveyQuestions();
  }

  private updatePagedSurveyQuestions(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedSurveyQuestions = this.filteredSurveyQuestions.slice(startIndex, endIndex);
  }

  deleteSurveyQuestion(surveyQuestionId: number) {
    const deleteMessage = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.SURVEY-QUESTION');

    this.dialogManagerService.openActionConfirmationDialog(deleteMessage).pipe(
      concatMap((result) =>
        result
          ? this.handleDeleteSurveyQuestion(surveyQuestionId)
          : this.handleCancelDelete()
      )
    ).subscribe();
  }

  private handleDeleteSurveyQuestion(surveyQuestionId: number) {
    return this.surveyManagementService.deleteSurveyQuestion(surveyQuestionId).pipe(
      tap(() => this.loadsSurveyQuestions())
    );
  }

  private handleCancelDelete() {
    return of(null);
  }

  openManageSurveyQuestionDialog(surveyQuestion: SurveyQuestionModel | null) {
    this.dialogManagerService.openManageSurveyQuestionDialog(surveyQuestion).subscribe({
      next: (response) => {
        if (response) this.loadsSurveyQuestions()
      }
    })
  }
}
