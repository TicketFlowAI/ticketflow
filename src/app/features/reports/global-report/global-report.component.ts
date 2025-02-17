import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { GlobalSpinnerComponent } from '../../../shared/components/global-spinner/global-spinner.component';
import { GlobalReportModel } from '../../../core/models/reports/global/global-report.model';
import { forkJoin } from 'rxjs';
import { ReportManagementService } from '../../../core/services/report-management.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS, CustomDateAdapter } from '../../../core/utils/custom-date-format';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { materialDateInvalidValidator } from '../../../shared/validators/custom-validators';

@Component({
  selector: 'global-report',
  standalone: true,
  imports: [
    CommonModule,
    GlobalSpinnerComponent,
    TranslocoDirective,
    MatCardModule,
    RouterLink,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    FaIconComponent
  ],
  templateUrl: './global-report.component.html',
  styleUrls: ['./global-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // Idioma español
    { provide: DateAdapter, useClass: CustomDateAdapter }, // Adaptador de fecha personalizado
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }, // Formato de fecha personalizado
  ]
})
export class GlobalReportComponent {
  protected readonly faArrowLeft = faArrowLeft;
  private readonly reportManagementService = inject(ReportManagementService);
  private readonly spinnerService = inject(SpinnerService);
  private readonly cdr = inject(ChangeDetectorRef);

  globalReport: GlobalReportModel = new GlobalReportModel();

  public averageTechnicians = 0;
  public mostTechniciansTicket: { ticket_id: number; technicians_count: number } | null = null;

  startDate: Date | null = null;
  endDate: Date | null = null;
  startFormControl = new FormControl(this.startDate, { validators: [Validators.required, materialDateInvalidValidator()] })
  endFormControl  = new FormControl(this.endDate, { validators: [Validators.required, materialDateInvalidValidator()] })
  
  dateRange = new FormGroup({
    start: this.startFormControl,
    end: this.endFormControl,
  })

  public complexityChartData: ChartConfiguration['data'] = {
    labels: [] as string[],
    datasets: [
      {
        label: 'Tickets por Complejidad',
        data: [] as number[],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  public distributionChartData: ChartConfiguration['data'] = {
    labels: [] as string[],
    datasets: [
      {
        label: 'Tickets por Escalamientos',
        data: [] as number[],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  public scorePerQuestionChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [] as string[],
    datasets: [
      {
        label: 'Average Score Per Question',
        data: [] as number[], // Los datos deben ser números
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  private complexityChartInstance: Chart | null = null;
  private distributionChartInstance: Chart | null = null;
  private avgScorePerQuestionChartInstance: Chart | null = null;

  constructor() {
    // Registrar todos los componentes necesarios de Chart.js
    Chart.register(...registerables);
  }

  showReport() {

    this.loadReportItems()
  }

  loadReportItems() {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: false });

    const ticketsSolvedQty = this.reportManagementService.getGlobalTicketsSolvedQty();
    const ticketsAvgTime = this.reportManagementService.getGlobalAverageTimeToClose();
    const escalations = this.reportManagementService.getGlobalTicketsEscalations();
    const complexity = this.reportManagementService.getGlobalTicketsPerComplexity();
    const humanInteraction = this.reportManagementService.getGlobalTicketsHumanInteraction();
    const globalAverageScore = this.reportManagementService.getGlobalAverageScore();
    const avgScoreSurveyPerQuestion = this.reportManagementService.getGlobalAverageScore();

    forkJoin([ticketsSolvedQty, ticketsAvgTime, escalations, complexity, humanInteraction, globalAverageScore, avgScoreSurveyPerQuestion]).subscribe({
      next: ([solvedQty, avgTime, escalations, complexityData, humanInteraction, avgScore, avgScoreSurveyPerQuestion]) => {
        // Actualizar métricas globales
        this.globalReport.totalTicketsQty = solvedQty;
        this.globalReport.averageTicketCloseTime = avgTime ?? 0;
        this.globalReport.humanInteraction = humanInteraction;
        this.globalReport.averageScorePerQuestion = avgScore ?? 0;

        this.globalReport.averageScorePerQuestion = avgScoreSurveyPerQuestion

        // Configurar datos de gráficos de complejidad
        this.complexityChartData.labels = complexityData.map(item => `Nivel ${item.complexity}`);
        this.complexityChartData.datasets[0].data = complexityData.map(item => item.count);

        // Calcular promedio y ticket con más técnicos
        this.averageTechnicians = this.calculateAverageTechnicians(escalations);
        this.mostTechniciansTicket = this.findMaxTechniciansTicket(escalations);

        // Configurar gráfico de distribución de escalamientos
        const groupedData = this.groupTicketsByTechnicians(escalations);
        this.distributionChartData.labels = Object.keys(groupedData).map(count => `${count} Técnicos`);
        this.distributionChartData.datasets[0].data = Object.values(groupedData);

        this.scorePerQuestionChartData.labels = avgScoreSurveyPerQuestion.map((q) => q.question); // Etiquetas
        this.scorePerQuestionChartData.datasets[0].data = avgScoreSurveyPerQuestion.map((q) => q.average_score); // Datos numéricos

        this.spinnerService.hideGlobalSpinner();
        
        this.createCharts();
        
        this.cdr.markForCheck();
      },
      error: () => {
        this.spinnerService.hideGlobalSpinner();
        console.error('Error al cargar los reportes');
      },
    });
  }

  private createCharts() {
    this.createComplexityChart();
    this.createDistributionChart();
    this.createScorePerQuestionChart();
  }

  private createComplexityChart() {
    if (this.complexityChartInstance) {
      this.complexityChartInstance.destroy();
    }
    const canvas = document.getElementById('complexityChart') as HTMLCanvasElement;
    if (canvas) {
      this.complexityChartInstance = new Chart(canvas, {
        type: 'bar',
        data: this.complexityChartData,
        options: {
          responsive: true,
          plugins: { legend: { display: true }, tooltip: { enabled: true } },
          scales: { x: { beginAtZero: true }, y: { beginAtZero: true } },
        },
      });
    }
  }

  private createDistributionChart() {
    if (this.distributionChartInstance) {
      this.distributionChartInstance.destroy();
    }
    const canvas = document.getElementById('distributionChart') as HTMLCanvasElement;
    if (canvas) {
      this.distributionChartInstance = new Chart(canvas, {
        type: 'bar',
        data: this.distributionChartData,
        options: {
          responsive: true,
          plugins: { legend: { display: true }, tooltip: { enabled: true } },
          scales: { x: { beginAtZero: true }, y: { beginAtZero: true } },
        },
      });
    }
  }

  private calculateAverageTechnicians(escalations: { technicians_count: number }[]): number {
    if (escalations.length === 0) return 0;
    const totalTechnicians = escalations.reduce((sum, esc) => sum + esc.technicians_count, 0);
    return totalTechnicians / escalations.length;
  }

  private findMaxTechniciansTicket(escalations: { ticket_id: number; technicians_count: number }[]): { ticket_id: number; technicians_count: number } | null {
    if (escalations.length === 0) return null;
    return escalations.reduce((max, esc) => (esc.technicians_count > max.technicians_count ? esc : max), escalations[0]);
  }

  private groupTicketsByTechnicians(escalations: { technicians_count: number }[]): Record<number, number> {
    return escalations.reduce((acc, curr) => {
      acc[curr.technicians_count] = (acc[curr.technicians_count] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  }

  private createScorePerQuestionChart(): void {
    if (this.avgScorePerQuestionChartInstance) {
      this.avgScorePerQuestionChartInstance.destroy(); // Limpia el gráfico anterior si existe
    }

    const canvas = document.getElementById('scorePerQuestionChart') as HTMLCanvasElement;
    if (canvas) {
      this.avgScorePerQuestionChartInstance = new Chart(canvas, {
        type: 'bar',
        data: this.scorePerQuestionChartData,
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
          },
          scales: {
            y: { beginAtZero: true } // Configuración del eje Y
          }
        }
      });
    }
  }
}
