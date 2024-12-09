import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-general-settings',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    RouterLink,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralSettingsComponent {
  
}
