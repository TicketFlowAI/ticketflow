import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TranslocoDirective } from '@jsverse/transloco';
import { ServiceModel } from '../../../../core/models/entities/service.model';
import { ServiceManagement } from '../../../../core/services/service-management.service';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faPencil, faX, faPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { DialogManagerService } from '../../../../core/services/dialog-manager.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-services',
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
  templateUrl: './all-services.component.html',
  styleUrl: './all-services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllServicesComponent {
  protected readonly faPencil = faPencil;
  protected readonly faInfoCircle = faInfoCircle;
  protected readonly faPlus = faPlus;
  protected readonly faX = faX;

  private serviceManagementService = inject(ServiceManagement)
  private dialogManagerService = inject(DialogManagerService)
  private cdr = inject(ChangeDetectorRef)

  services: ServiceModel[] = []
  filteredServices: ServiceModel[] = [];
  pagedServices: ServiceModel[] = [];

  pageSize = 6; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  filterText = ''; // Texto de filtro
  
  ngOnInit(): void {
    this.serviceManagementService.getAllServices().subscribe({
      next: (response) => {

        this.services = response;
        this.filteredServices = this.services;
        this.updatePagedServices();
        this.cdr.detectChanges();
      }
    });
  }

  onFilterChange(): void {
    const filterText = this.filterText.toLowerCase();

    this.filteredServices = this.services.filter(service =>
      service.description.toLowerCase().includes(filterText) ||
      service.category.toLowerCase().includes(filterText) ||
      service.price.toString().toLowerCase().includes(filterText) ||
      service.tax_description.toLowerCase().includes(filterText)
    );
    this.pageIndex = 0;
    this.updatePagedServices();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedServices();
  }

  private updatePagedServices(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedServices = this.filteredServices.slice(startIndex, endIndex);
  }

  openConfirmationDialog() {
    this.dialogManagerService.openActionConfrimationDialog("¿Está seguro que desea eliminar el servicio del listado?")
  }

  openServiceInfoDialog(service: ServiceModel) {
    this.dialogManagerService.openServiceInfoDialog(service)
  }

  openServiceManageDialog(service: ServiceModel | null) {
    this.dialogManagerService.openManageServiceDialog(service)
  }
}
