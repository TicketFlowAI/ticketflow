import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faPencil, faX, faPlus, faInfoCircle, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { RouterLink } from '@angular/router';
import { DialogManagerService } from '../../../../core/services/dialog-manager.service';
import { ServiceContractTermModel } from '../../../../core/models/entities/service-contract-term.model';
import { ServiceContractManagementService } from '../../../../core/services/service-contract-management.service';
import { concatMap, of, tap } from 'rxjs';

@Component({
  selector: 'app-all-service-contract-terms',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslocoDirective,
    MatExpansionModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FaIconComponent,
  ],
  templateUrl: './all-service-contract-terms.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllServiceContractTermsComponent {
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faPencil = faPencil;
  protected readonly faInfoCircle = faInfoCircle;
  protected readonly faPlus = faPlus;
  protected readonly faX = faX;

  private readonly serviceContractManagementService = inject(ServiceContractManagementService)
  private readonly dialogManagerService = inject(DialogManagerService)

  private readonly cdr = inject(ChangeDetectorRef)
  private readonly translocoService = inject(TranslocoService)

  serviceContractTerms: ServiceContractTermModel[] = []
  filteredServiceContractTerms: ServiceContractTermModel[] = [];
  pagedServiceContractTerms: ServiceContractTermModel[] = [];

  pageSize = 6; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  filterText = ''; // Texto de filtro
  
  ngOnInit(): void {
    this.loadServiceContractTerms();
  }

  loadServiceContractTerms() {
    this.serviceContractManagementService.getAllServiceContractTerms().subscribe({
      next: (response) => {
        this.serviceContractTerms = response;
        this.filteredServiceContractTerms = this.serviceContractTerms;
        this.updatePagedServiceContractTermTerms();
        this.cdr.detectChanges();
      }
    });
  }

  onFilterChange(): void {
    const filterText = this.filterText.toLowerCase();

    this.filteredServiceContractTerms = this.serviceContractTerms.filter(service =>
      service.term.toLowerCase().includes(filterText) ||
      service.months.toString().toLowerCase().includes(filterText)
    );
    this.pageIndex = 0;
    this.updatePagedServiceContractTermTerms();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedServiceContractTermTerms();
  }

  private updatePagedServiceContractTermTerms(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedServiceContractTerms = this.filteredServiceContractTerms.slice(startIndex, endIndex);
  }

  deleteServiceContractTerm(serviceContractTermId: number) {
    const deleteMessage = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.DELETE-SERVICE-CONTRACT-TERM');
    
    this.dialogManagerService.openActionConfirmationDialog(deleteMessage).pipe(
      concatMap((result) => result ? this.handleDeleteServiceContractTerm(serviceContractTermId) : this.handleCancelDelete())
    ).subscribe();
  }

  private handleDeleteServiceContractTerm(serviceContractTermId: number) {
    return this.serviceContractManagementService.deleteServiceContractTerm(serviceContractTermId).pipe(
      tap(() => this.loadServiceContractTerms())
    );
  }
  
  private handleCancelDelete() {
    return of(null);
  }

  openServiceContractTermManageDialog(serviceContract: ServiceContractTermModel | null) {
    this.dialogManagerService.openManageServiceContractTermDialog(serviceContract).subscribe(
      () => { this.loadServiceContractTerms() }
    )
  }
}
