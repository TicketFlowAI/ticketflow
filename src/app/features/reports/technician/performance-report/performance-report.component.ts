import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { GlobalSpinnerComponent } from "../../../../shared/components/global-spinner/global-spinner.component";
import { TranslocoDirective } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { UserManagementService } from '../../../../core/services/user-management.service';
import { ReportManagementService } from '../../../../core/services/report-management.service';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { forkJoin } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ChartConfiguration, PolarAreaController, RadialLinearScale, PieController } from 'chart.js';
import { TechnicianPerformanceReportModel } from '../../../../core/models/reports/techinican-performance/technician-performanceReport.model';

@Component({
  selector: 'app-performance-report',
  standalone: true,
  imports: [
    CommonModule,
    GlobalSpinnerComponent,
    TranslocoDirective,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    RouterLink,
    MatCardModule
  ],
  templateUrl: './performance-report.component.html',
  styleUrls: ['./performance-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceReportComponent {
  @Input() technicianId!: string;

  private readonly reportManagementService = inject(ReportManagementService);
  private readonly userManagementService = inject(UserManagementService);
  private readonly spinnerService = inject(SpinnerService);
  private readonly cdr = inject(ChangeDetectorRef);

  performanceReport: TechnicianPerformanceReportModel = new TechnicianPerformanceReportModel();

  public reassignmentChartData: ChartConfiguration['data'] = {
    labels: ['Assigned', 'Reassigned'],
    datasets: [
      {
        label: 'Reassignments',
        data: [] as number[],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  public weeklyComparisonChartData: ChartConfiguration['data'] = {
    labels: ['Previous Week', 'Current Week'],
    datasets: [
      {
        label: 'Weekly Comparison',
        data: [] as number[],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 159, 64, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  private reassignmentChartInstance: Chart | null = null;
  private weeklyComparisonChartInstance: Chart | null = null;

  isAdmin: boolean = false;

  constructor() {
    // Registrar los controladores de Chart.js que son necesarios para los gráficos 'pie' y 'bar'
    Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PolarAreaController, RadialLinearScale, PieController);
  }

  ngOnInit(): void {
    const idNumber = Number.parseInt(this.technicianId);
    if (idNumber) {
      this.loadReportItems(idNumber);
    }

    this.isAdmin = this.userManagementService.isUserAdmin();
  }

  loadReportItems(technicianId: number) {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: false });

    const ticketsSolved = this.reportManagementService.getTechnicianTicketsSolvedByTechnicianId(technicianId);
    const currentTickets = this.reportManagementService.getTechnicianCurrentTicketsById(technicianId);
    const avgTime = this.reportManagementService.getTechnicianAverageTimeToSolveById(technicianId);
    const assignedReassigned = this.reportManagementService.getTechnicianTicketsAssignedReassignedById(technicianId);
    const weeklyComparison = this.reportManagementService.getTechnicianWeeklyComparisonById(technicianId);

    forkJoin([ticketsSolved, currentTickets, avgTime, assignedReassigned, weeklyComparison]).subscribe({
      next: ([solvedQty, currentQty, avgTimeRes, assignedRes, weeklyComp]) => {
        // Actualizar datos en el modelo del reporte
        this.performanceReport.totalTicketsSolved = solvedQty;
        this.performanceReport.currentTickets = currentQty;
        this.performanceReport.averageTicketSolveTime = avgTimeRes ?? 0;
        this.performanceReport.assignedReassigned = assignedRes;
        this.performanceReport.weeklyComparison = weeklyComp;

        // Configurar datos de gráficos a partir del reporte
        this.reassignmentChartData.datasets[0].data = [
          this.performanceReport.assignedReassigned.assigned,
          this.performanceReport.assignedReassigned.reassigned,
        ];

        this.weeklyComparisonChartData.datasets[0].data = [
          this.performanceReport.weeklyComparison.previous_week,
          this.performanceReport.weeklyComparison.current_week,
        ];

        this.spinnerService.hideGlobalSpinner();
        this.createCharts();
        this.cdr.markForCheck();
      },
      error: () => {
        this.spinnerService.hideGlobalSpinner();
        console.error('Error al cargar los datos del reporte');
      },
    });
  }

  private createCharts() {
    this.createReassignmentChart();
    this.createWeeklyComparisonChart();
  }

  private createReassignmentChart() {
    if (this.reassignmentChartInstance) {
      this.reassignmentChartInstance.destroy();
    }
    const canvas = document.getElementById('reassignmentChart') as HTMLCanvasElement;
    if (canvas) {
      this.reassignmentChartInstance = new Chart(canvas, {
        type: 'polarArea', // Tipo de gráfico 'pie'
        data: this.reassignmentChartData,
        options: {
          responsive: true,
          plugins: { legend: { display: true }, tooltip: { enabled: true } },
        },
      });
    }
  }

  private createWeeklyComparisonChart() {
    if (this.weeklyComparisonChartInstance) {
      this.weeklyComparisonChartInstance.destroy();
    }
    const canvas = document.getElementById('weeklyComparisonChart') as HTMLCanvasElement;
    if (canvas) {
      this.weeklyComparisonChartInstance = new Chart(canvas, {
        type: 'pie', // Tipo de gráfico 'bar'
        data: this.weeklyComparisonChartData,
        options: {
          responsive: true,
          plugins: { legend: { display: true }, tooltip: { enabled: true } },
          scales: { x: { beginAtZero: true }, y: { beginAtZero: true } },
        },
      });
    }
  }
}
