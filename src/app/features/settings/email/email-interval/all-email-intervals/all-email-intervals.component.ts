import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { EmailIntervalModel } from '../../../../../core/models/entities/email-interval.model';
import { faArrowLeft, faPencil, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { concatMap, tap, of } from 'rxjs';
import { DialogManagerService } from '../../../../../core/services/dialog-manager.service';
import { EmailManagementService } from '../../../../../core/services/email-management.service';

@Component({
  selector: 'app-all-email-intervals',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatPaginatorModule,
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FaIconComponent,
  ],
  templateUrl: './all-email-intervals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllEmailIntervalsComponent {
  protected readonly faArrowLeft = faArrowLeft;
    protected readonly faPencil = faPencil;
    protected readonly faPlus = faPlus;
    protected readonly faX = faX;
  
    private readonly emailManagementService = inject(EmailManagementService)
    private readonly dialogManagerService = inject(DialogManagerService)
  
    private readonly cdr = inject(ChangeDetectorRef)
    private readonly translocoService = inject(TranslocoService)
  
    emailIntervals: EmailIntervalModel[] = []
    filteredEmailIntervals: EmailIntervalModel[] = [];
    pagedEmailIntervals: EmailIntervalModel[] = [];
  
    pageSize = 6; // Tamaño de página por defecto
    pageIndex = 0; // Índice de la página actual
    filterText = ''; // Texto de filtro
  
    ngOnInit(): void {
      this.loadEmailIntervals();
    }
  
    loadEmailIntervals() {
      this.emailManagementService.getAllEmailIntervals().subscribe({
        next: (response) => {
          this.emailIntervals = response;
          this.filteredEmailIntervals = this.emailIntervals;
          this.updatePagedEmailIntervals();
          this.cdr.detectChanges();
        }
      });
    }
  
    onFilterChange(): void {
      const filterText = this.filterText.toLowerCase();
  
      this.filteredEmailIntervals = this.emailIntervals.filter(emailInterval =>
        emailInterval.type.toString().toLowerCase().includes(filterText) ||
        emailInterval.days.toString().toLowerCase().includes(filterText)
      );
  
      this.pageIndex = 0;
      this.updatePagedEmailIntervals();
    }
  
    onPageChange(event: PageEvent): void {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.updatePagedEmailIntervals();
    }
  
    private updatePagedEmailIntervals(): void {
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.pagedEmailIntervals = this.filteredEmailIntervals.slice(startIndex, endIndex);
    }
    
    deleteEmailInterval(emailIntervalId: number) {
      const deleteMessage = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.DELETE-EMAIL-INTERVAL');
    
      this.dialogManagerService.openActionConfirmationDialog(deleteMessage).pipe(
        concatMap((result) => 
          result 
            ? this.handleDeleteEmailInterval(emailIntervalId) 
            : this.handleCancelDelete()
        )
      ).subscribe();
    }
    
    private handleDeleteEmailInterval(emailIntervalId: number) {
      return this.emailManagementService.deleteEmailTemplate(emailIntervalId).pipe(
        tap(() => this.loadEmailIntervals())
      );
    }
    
    private handleCancelDelete() {
      return of(null);
    }  
  
    openManageEmailIntervalDialog(emailInterval: EmailIntervalModel | null) {
      this.dialogManagerService.openManageEmailIntervalDialog(emailInterval).subscribe({
        next: (response) => {
           if(response) this.loadEmailIntervals() 
        }
      })
    }
}
