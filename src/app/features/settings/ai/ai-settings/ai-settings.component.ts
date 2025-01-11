import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslocoDirective } from '@jsverse/transloco';
import { GlobalSpinnerComponent } from '../../../../shared/components/global-spinner/global-spinner.component';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ai-settings',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslocoDirective,
    FaIconComponent,
    GlobalSpinnerComponent
  ],
  templateUrl: './ai-settings.component.html',
  styleUrl: './ai-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiSettingsComponent {
  protected readonly faArrowLeft = faArrowLeft;
}
