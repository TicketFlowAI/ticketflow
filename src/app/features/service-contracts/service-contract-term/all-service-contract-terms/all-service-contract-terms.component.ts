import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TranslocoDirective } from '@jsverse/transloco';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faPencil, faX, faPlus, faInfoCircle, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { RouterLink } from '@angular/router';
import { DialogManagerService } from '../../../../core/services/dialog-manager.service';
import { ServiceContractTermModel } from '../../../../core/models/entities/service-contract-term.model';
import { ServiceContractManagementService } from '../../../../core/services/service-contract-management.service';

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

  private serviceContractManagementService = inject(ServiceContractManagementService)
  private dialogManagerService = inject(DialogManagerService)
  private cdr = inject(ChangeDetectorRef)

  serviceContractTerms: ServiceContractTermModel[] = []
  filteredServiceContractTerms: ServiceContractTermModel[] = [];
  pagedServiceContractTerms: ServiceContractTermModel[] = [];

  pageSize = 6; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  filterText = ''; // Texto de filtro
  
  ngOnInit(): void {
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

  openConfirmationDialog() {
    this.dialogManagerService.openActionConfrimationDialog("¿Está seguro que desea eliminar este periodo del listado?")
  }

  openServiceContractTermManageDialog(serviceContract: ServiceContractTermModel | null) {
    this.dialogManagerService.openManageServiceContractTermDialog(serviceContract)
  }
}
