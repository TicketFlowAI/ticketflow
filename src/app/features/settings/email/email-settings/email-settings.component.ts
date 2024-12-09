import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslocoDirective } from '@jsverse/transloco';
import { faArrowLeft, faPencil, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { AllEmailTemplatesComponent } from "../email-template/all-email-templates/all-email-templates.component";
import { GlobalSpinnerComponent } from "../../../../shared/components/global-spinner/global-spinner.component";

@Component({
  selector: 'app-email-settings',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslocoDirective,
    MatPaginatorModule,
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FaIconComponent,
    AllEmailTemplatesComponent,
    GlobalSpinnerComponent
],
  templateUrl: './email-settings.component.html',
  styleUrl: './email-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailSettingsComponent {
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faPencil = faPencil;
  protected readonly faPlus = faPlus;
  protected readonly faX = faX;
}
