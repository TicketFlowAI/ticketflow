import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { Observable, map, catchError, of, finalize } from 'rxjs';
import { MessageService } from '../../shared/services/message.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { EmailService } from '../api/servicios-mindsoftdev/email.service';
import { EmailTemplateModel } from '../models/entities/email-template.model';
import { EmailIntervalModel } from '../models/entities/email-interval.model';
import { EmailIntervalService } from '../api/servicios-mindsoftdev/email-interval.service';

@Injectable({
  providedIn: 'root'
})
export class EmailManagementService {
  private readonly emailService = inject(EmailService)
  private readonly emailIntervalService = inject(EmailIntervalService)
  
  private readonly messageService = inject(MessageService)
  private readonly translocoService = inject(TranslocoService)
  private readonly spinnerService = inject(SpinnerService)

  getAllEmailTemplates(): Observable<EmailTemplateModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});
    
    return this.emailService.getEmailTemplates().pipe(
      map((emails) => emails.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }
  
  getOneEmailTemplate(id: number): Observable<EmailTemplateModel | null> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});
    return this.emailService.getEmailTemplate(id).pipe(
      map((email) => email.data),
      catchError(() => {
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  addEmailTemplate(newEmailTemplate: EmailTemplateModel): Observable<boolean> {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: false});
    return this.emailService.createEmailTemplate(newEmailTemplate).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.EMAIL-TEMPLATE');
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

  editEmailTemplate(editEmailTemplate: EmailTemplateModel): Observable<boolean> {
    return this.emailService.updateEmailTemplate(editEmailTemplate).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.EMAIL-TEMPLATE');
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

  deleteEmailTemplate(id: number): Observable<boolean> {
    return this.emailService.deleteEmailTemplate(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.EMAIL-TEMPLATE');
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

  getAllEmailIntervals(): Observable<EmailIntervalModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});
    
    return this.emailIntervalService.getEmailIntervals().pipe(
      map((intervals) => intervals.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    );
  }
  
  getOneEmailIntervals(id: number): Observable<EmailIntervalModel | null> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});
    return this.emailIntervalService.getEmailInterval(id).pipe(
      map((interval) => interval.data),
      catchError(() => {
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  addEmailInterval(newEmailInterval: EmailIntervalModel): Observable<boolean> {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: false});
    return this.emailIntervalService.createEmailInterval(newEmailInterval).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.EMAIL-INTERVAL');
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

  editEmailInterval(editEmailInterval: EmailIntervalModel): Observable<boolean> {
    return this.emailIntervalService.updateEmailInterval(editEmailInterval).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.EMAIL-INTERVAL');
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

  deleteEmailInterval(id: number): Observable<boolean> {
    return this.emailIntervalService.deleteEmailInterval(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.EMAIL-INTERVAL');
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
}
