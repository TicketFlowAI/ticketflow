import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, numberAttribute } from '@angular/core';
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
import { finalize, forkJoin } from 'rxjs';
import { TechnicianPerformanceReportModel } from '../../../../core/models/reports/techinican-performance/technician-performanceReport.model';
import { MatCardModule } from '@angular/material/card';

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
  styleUrl: './performance-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceReportComponent {
  @Input() technicianId!: string;

  private readonly reportManagementService = inject(ReportManagementService)
  private readonly userManagementService = inject(UserManagementService)

  private readonly spinnerService = inject(SpinnerService)
  private readonly cdr = inject(ChangeDetectorRef)

  performanceReport: TechnicianPerformanceReportModel = new TechnicianPerformanceReportModel()

  isAdmin: boolean = false;

  ngOnInit(): void {
    const idNumber = Number.parseInt(this.technicianId)
    if (idNumber) {
      this.loadReportItems(idNumber)
    }

    this.isAdmin = this.userManagementService.isUserAdmin()
  }

  loadReportItems(technicianId: number) {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: false });

    const ticketsSolvedQty = this.reportManagementService.getTechnicianTicketsSolvedByTechnicianId(technicianId)
    const currentTicketsQty = this.reportManagementService.getTechnicianCurrentTicketsById(technicianId)
    const ticketsAvgTime = this.reportManagementService.getTechnicianAverageTimeToSolveById(technicianId)
    const assignedReassignedTickets = this.reportManagementService.getTechnicianTicketsAssignedReassignedById(technicianId)
    const weeklyComparison = this.reportManagementService.getTechnicianWeeklyComparisonById(technicianId)

    forkJoin([
      ticketsSolvedQty,
      currentTicketsQty,
      ticketsAvgTime,
      assignedReassignedTickets,
      weeklyComparison
    ]).subscribe({
      next: ([result1, result2, result3, result4, result5]) => {
        this.performanceReport.totalTicketsSolved = result1;
        this.performanceReport.currentTickets = result2;
        this.performanceReport.averageTicketSolveTime = result3;
        this.performanceReport.assignedReassigned = result4;
        this.performanceReport.weeklyComparison = result5;

        console.log(this.performanceReport)
        this.spinnerService.hideGlobalSpinner()
        this.cdr.markForCheck();
        
      },
    });
  }
}
