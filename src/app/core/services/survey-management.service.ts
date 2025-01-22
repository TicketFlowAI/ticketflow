import { inject, Injectable } from '@angular/core';
import { SurveyService } from '../api/servicios-mindsoftdev/survey.service';
import { SurveyQuestionService } from '../api/servicios-mindsoftdev/survey-question.service';
import { TranslocoService } from '@jsverse/transloco';
import { Observable, map, catchError, of, finalize } from 'rxjs';
import { MessageService } from '../../shared/services/message.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { SurveyAnswerModel, SurveyModel } from '../models/entities/survey.model';
import { SurveyQuestionModel } from '../models/entities/survey-question.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyManagementService {
  private readonly surveyService = inject(SurveyService)
  private readonly surveyQuestionService = inject(SurveyQuestionService)

  private readonly messageService = inject(MessageService)
  private readonly spinnerService = inject(SpinnerService)
  private readonly translocoService = inject(TranslocoService)

  getSurveyByTicketId(id: number): Observable<SurveyAnswerModel[] | []> {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.surveyService.getSurvey(id).pipe(
      map((survey) => {
        if(survey.data.length == 0) {
          const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.TICKET-SURVEY-NO-SURVEY');
        this.messageService.addInfoMessage(transate)
        }

        return survey.data
      }),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  addSurvey(newSurvey: SurveyModel): Observable<boolean> {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.surveyService.createSurvey(newSurvey).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.SURVEY');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  editSurvey(editSurvey: SurveyModel): Observable<boolean> {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.surveyService.updateSurvey(editSurvey).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.SURVEY');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  deleteSurvey(id: number): Observable<boolean> {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: false });

    return this.surveyService.deleteSurvey(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.SURVEY');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  getAllSurveyQuestions(): Observable<SurveyQuestionModel[] | []> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: false });

    return this.surveyQuestionService.getAllSurveyQuestions().pipe(
      map((surveyQuestions) => surveyQuestions.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  getActiveSurveyQuestions(): Observable<SurveyQuestionModel[] | []> {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: false });

    return this.surveyQuestionService.getSurveyQuestions().pipe(
      map((surveyQuestions) => surveyQuestions.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  getOneSurveyQuestion(id: number): Observable<SurveyQuestionModel | null> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: false });

    return this.surveyQuestionService.getSurveyQuestion(id).pipe(
      map((surveyQuestionModel) => surveyQuestionModel.data),
      catchError(() => {
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  getDeletedSurveyQuestions(): Observable<SurveyQuestionModel[] | []> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.surveyQuestionService.getDeletedSurveyQuestions().pipe(
      map((surveyQuestions) => surveyQuestions.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  addSurveyQuestion(newSurveyQuestion: SurveyQuestionModel): Observable<boolean> {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.surveyQuestionService.createSurveyQuestion(newSurveyQuestion).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.SURVEY-QUESTION');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  editSurveyQuestion(editSurveyQuestion: SurveyQuestionModel): Observable<boolean> {
    this.spinnerService.showDialogSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.surveyQuestionService.updateSurveyQuestion(editSurveyQuestion).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.SURVEY-QUESTION');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  deleteSurveyQuestion(id: number): Observable<boolean> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.surveyQuestionService.deleteSurveyQuestion(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.SURVEY-QUESTION');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  restoreSurveyQuestion(id: number): Observable<boolean> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.surveyQuestionService.restoreSurveyQuestion(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.RESTORE.SURVEY-QUESTION');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.RESTORE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }
}
