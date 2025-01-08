import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatCardModule,
    MatIcon,
    RouterLink
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent {

}
