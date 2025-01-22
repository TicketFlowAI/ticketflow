import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { GlobalSpinnerComponent } from "../../../../shared/components/global-spinner/global-spinner.component";
import { TranslocoDirective } from '@jsverse/transloco';
import { CommonModule, formatDate } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { UserManagementService } from '../../../../core/services/user-management.service';
import { ReportManagementService } from '../../../../core/services/report-management.service';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { forkJoin } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ChartConfiguration, PolarAreaController, RadialLinearScale, PieController, BarController } from 'chart.js';
import { TechnicianPerformanceReportModel } from '../../../../core/models/reports/techinican-performance/technician-performanceReport.model';
import { materialDateInvalidValidator } from '../../../../shared/validators/custom-validators';
import { CustomDateAdapter, CUSTOM_DATE_FORMATS } from '../../../../core/utils/custom-date-format';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // Idioma español
    { provide: DateAdapter, useClass: CustomDateAdapter }, // Adaptador de fecha personalizado
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }, // Formato de fecha personalizado
  ]
})
export class PerformanceReportComponent {
  @Input() technicianId: string = '';

  private readonly reportManagementService = inject(ReportManagementService);
  private readonly userManagementService = inject(UserManagementService);
  private readonly spinnerService = inject(SpinnerService);
  private readonly cdr = inject(ChangeDetectorRef);

  startDate: Date | null = null;
  endDate: Date | null = null;
  startFormControl = new FormControl(this.startDate, { validators: [Validators.required, materialDateInvalidValidator()] })
  endFormControl = new FormControl(this.endDate, { validators: [Validators.required, materialDateInvalidValidator()] })

  dateRange = new FormGroup({
    start: this.startFormControl,
    end: this.endFormControl,
  })

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


  private reassignmentChartInstance: Chart | null = null;
  private weeklyComparisonChartInstance: Chart | null = null;
  private avgScorePerQuestionChartInstance: Chart | null = null;

  isAdmin: boolean = false;

  constructor() {
    // Registrar los controladores de Chart.js que son necesarios para los gráficos 'pie' y 'bar'
    Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PolarAreaController, BarController, RadialLinearScale, PieController);
  }

  ngOnInit(): void {
    this.isAdmin = this.userManagementService.isUserAdmin();
  }

  showReport() {
    const idNumber = Number.parseInt(this.technicianId);
    if (idNumber) {
      this.loadReportItems(idNumber)
    }
  }

  loadReportItems(technicianId: number) {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: false });

    const startDate = this.dateRange.value.start
      ? formatDate(this.dateRange.value.start, 'dd/MM/yyyy', 'en-US')
      : '';
    const endDate = this.dateRange.value.end
      ? formatDate(this.dateRange.value.end, 'dd/MM/yyyy', 'en-US')
      : '';

    const ticketsSolved = this.reportManagementService.getTechnicianTicketsSolvedByTechnicianId(technicianId, startDate, endDate);
    const currentTickets = this.reportManagementService.getTechnicianCurrentTicketsById(technicianId);
    const avgTime = this.reportManagementService.getTechnicianAverageTimeToSolveById(technicianId, startDate, endDate);
    const assignedReassigned = this.reportManagementService.getTechnicianTicketsAssignedReassignedById(technicianId, startDate, endDate);
    const weeklyComparison = this.reportManagementService.getTechnicianWeeklyComparisonById(technicianId);
    const avgScoreSurvey = this.reportManagementService.getTechnicianSurveysAverageScore(technicianId);
    const avgScoreSurveyPerQuestion = this.reportManagementService.getTechnicianSurveryAverageScorePerQuestion(technicianId);

    forkJoin([ticketsSolved, currentTickets, avgTime, assignedReassigned, weeklyComparison, avgScoreSurvey, avgScoreSurveyPerQuestion]).subscribe({
      next: ([solvedQty, currentQty, avgTimeRes, assignedRes, weeklyComp, avgSurvey, avgScoreSurveyPerQuestion]) => {
        // Actualizar datos en el modelo del reporte
        this.performanceReport.totalTicketsSolved = solvedQty;
        this.performanceReport.currentTickets = currentQty;
        this.performanceReport.assignedReassigned = assignedRes;
        this.performanceReport.weeklyComparison = weeklyComp;
        this.performanceReport.averageScoreQuestions = typeof avgSurvey === 'number' ? avgSurvey : 0;
        this.performanceReport.averageTicketSolveTime = typeof avgTimeRes === 'number' ? avgTimeRes : 0;

        this.performanceReport.averageScorePerQuestion = avgScoreSurveyPerQuestion

        // Configurar datos de gráficos a partir del reporte
        this.reassignmentChartData.datasets[0].data = [
          this.performanceReport.assignedReassigned.assigned,
          this.performanceReport.assignedReassigned.reassigned,
        ];

        this.weeklyComparisonChartData.datasets[0].data = [
          this.performanceReport.weeklyComparison.previous_week,
          this.performanceReport.weeklyComparison.current_week,
        ];

        this.scorePerQuestionChartData.labels = avgScoreSurveyPerQuestion.map((q) => q.question); // Etiquetas
        this.scorePerQuestionChartData.datasets[0].data = avgScoreSurveyPerQuestion.map((q) => q.average_score); // Datos numéricos


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
    this.createScorePerQuestionChart();
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
