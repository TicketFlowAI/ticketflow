import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslocoDirective } from '@jsverse/transloco';
import { GlobalSpinnerComponent } from '../../../../shared/components/global-spinner/global-spinner.component';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AiManagementService } from '../../../../core/services/ai-management.service';
import { AiClassifierModel, AiClassifierPerformanceModel } from '../../../../core/models/entities/ai-classifier.model';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-ai-settings',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslocoDirective,
    FaIconComponent,
    GlobalSpinnerComponent,
    MatExpansionModule
  ],
  templateUrl: './ai-settings.component.html',
  styleUrl: './ai-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiSettingsComponent {
  protected readonly faArrowLeft = faArrowLeft;

  private aiManagementService = inject(AiManagementService)
  private cdr = inject(ChangeDetectorRef)

  classifiers: AiClassifierModel[] = []
  classifierPerformance: AiClassifierPerformanceModel | null = null
  ngOnInit(): void {
    this.aiManagementService.getAllClassifiers().subscribe({
      next: (classifiers) => {
        this.classifiers = classifiers
        this.cdr.markForCheck()
      }
    })
  }

  getClassifierPerformance(name: string) {
    this.aiManagementService.getClassifierPerformance(name).subscribe({
      next: (performance) => {
        this.classifierPerformance = performance;
        this.cdr.markForCheck()
      }
    })
  }
}
