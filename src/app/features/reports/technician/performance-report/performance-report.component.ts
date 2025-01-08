import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-performance-report',
  standalone: true,
  imports: [],
  templateUrl: './performance-report.component.html',
  styleUrl: './performance-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceReportComponent {

}
