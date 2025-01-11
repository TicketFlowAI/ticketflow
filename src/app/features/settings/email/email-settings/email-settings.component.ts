import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslocoDirective } from '@jsverse/transloco';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { AllEmailTemplatesComponent } from "../email-template/all-email-templates/all-email-templates.component";
import { GlobalSpinnerComponent } from "../../../../shared/components/global-spinner/global-spinner.component";
import { DialogManagerService } from '../../../../core/services/dialog-manager.service';
import { AllEmailIntervalsComponent } from "../email-interval/all-email-intervals/all-email-intervals.component";

@Component({
  selector: 'app-email-settings',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslocoDirective,
    FaIconComponent,
    AllEmailTemplatesComponent,
    GlobalSpinnerComponent,
    AllEmailIntervalsComponent
],
  templateUrl: './email-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailSettingsComponent {
  protected readonly faArrowLeft = faArrowLeft;

  private readonly dialogManagerService = inject(DialogManagerService)

  openParametersInfo() {
    this.dialogManagerService.openEmailParametersInfoDialog()
  }
}
