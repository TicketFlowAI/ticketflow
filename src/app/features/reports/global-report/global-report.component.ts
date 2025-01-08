import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'global-report',
  standalone: true,
  imports: [],
  templateUrl: './global-report.component.html',
  styleUrl: './global-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalReportComponent {

}
