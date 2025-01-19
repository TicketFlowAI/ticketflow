import { inject, Injectable } from '@angular/core';
import { AiService } from '../api/servicios-mindsoftdev/ai.service';
import { AiClassifierModel, AiClassifierPerformanceModel, IAiClassifiersApiResponse } from '../models/entities/ai-classifier.model';
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

    getClassifierPerformance(classfierName: string): Observable<AiClassifierPerformanceModel | null> {
      this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});
      
      return this.aiService.getClassifierPerformance(classfierName).pipe(
        map((response) => {
          return response.data
        }),
        catchError(() => {
          const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.CLASSIFIER-ERROR');
          this.messageService.addErrorMessage(transate)
          return of(null)
        }),
        finalize(() => {
          this.spinnerService.hideDialogSpinner();
        })
      )
    }
}
