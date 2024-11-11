import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { ServiceManagementService } from '../../../../core/services/service-management.service';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faPencil, faX, faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { DialogManagerService } from '../../../../core/services/dialog-manager.service';
import { ServiceCategoryModel } from '../../../../core/models/entities/service-category.model';
import { RouterLink } from '@angular/router';
import { concatMap, of, take, tap } from 'rxjs';

@Component({
  selector: 'app-all-service-categories',
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
  templateUrl: './all-service-categories.component.html',
  styleUrl: './all-service-categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllServiceCategoriesComponent {
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faPencil = faPencil;
  protected readonly faPlus = faPlus;
  protected readonly faX = faX;

  private readonly serviceManagementService = inject(ServiceManagementService)
  private readonly dialogManagerService = inject(DialogManagerService)

  private readonly translocoService: TranslocoService = inject(TranslocoService)
  private readonly cdr = inject(ChangeDetectorRef)

  serviceCategories: ServiceCategoryModel[] = []
  filteredServiceCategories: ServiceCategoryModel[] = [];
  pagedServiceCategories: ServiceCategoryModel[] = [];

  pageSize = 6; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  filterText = ''; // Texto de filtro

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories() {
    this.serviceManagementService.getAllServiceCategories().subscribe({
      next: (response) => {
        this.serviceCategories = response;
        this.filteredServiceCategories = this.serviceCategories;
        this.updatePagedServiceCategories();
        this.cdr.detectChanges();
      }
    });
  }

  onFilterChange(): void {
    const filterText = this.filterText.toLowerCase();

    this.filteredServiceCategories = this.serviceCategories.filter(category =>
      category.category.toLowerCase().includes(filterText)
    );
    this.pageIndex = 0;
    this.updatePagedServiceCategories();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedServiceCategories();
  }

  private updatePagedServiceCategories(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedServiceCategories = this.filteredServiceCategories.slice(startIndex, endIndex);
  }

  deleteCategory(serviceCategoryId: number) {
    const deleteMessage = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.DELETE-SERVICE-CATEGORY');

    this.dialogManagerService.openActionConfirmationDialog(deleteMessage).pipe(
      concatMap((result) => {
        if(result)
          return this.serviceManagementService.deleteServiceCategory(serviceCategoryId)
        else
          return of(null)
      })
    ).subscribe( (result) => { if(result) this.loadCategories() } )
  }

  openServiceCategoryManageDialog(serviceCategory: ServiceCategoryModel | null) {
    this.dialogManagerService.openManageServiceCategoryDialog(serviceCategory).subscribe(
      () => { this.loadCategories() }
    )
  }
}
