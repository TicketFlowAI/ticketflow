import { inject, Injectable } from '@angular/core';
import { AiService } from '../api/servicios-mindsoftdev/ai.service';
import { AiClassifierModel } from '../models/entities/ai-classifier.model';
import { TranslocoService } from '@jsverse/transloco';
import { Observable, map, catchError, of, finalize } from 'rxjs';
import { MessageService } from '../../shared/services/message.service';
import { SpinnerService } from '../../shared/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AiManagementService {
  private readonly aiService = inject(AiService)
    
    private readonly messageService = inject(MessageService)
    private readonly translocoService = inject(TranslocoService)
    private readonly spinnerService = inject(SpinnerService)
  
    getAllClassifiers(): Observable<AiClassifierModel[] | []> {
      this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});
      
      return this.aiService.getClassifiersAndVersion().pipe(
        map((classfiers) => classfiers.data),
        catchError(() => {
          return of([]);
        }),
        finalize(() => {
          this.spinnerService.hideGlobalSpinner();
        })
      );
    }

    selectClassifiers(classi1: string, classi2: string): Observable<boolean> {
      this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});
      
      return this.aiService.selectClassifiers(classi1, classi2).pipe(
        map(() => {
          const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.SELECT-CLASSI-SUCCESS');
          this.messageService.addSuccessMessage(transate)
          return true
        }),
        catchError(() => {
          const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.SELECT-CLASSI-UNSUCCESS');
          this.messageService.addErrorMessage(transate)
          return of(false)
        }),
        finalize(() => {
          this.spinnerService.hideDialogSpinner();
        })
      )
    }
}
