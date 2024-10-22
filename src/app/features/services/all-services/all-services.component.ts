import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TranslocoDirective } from '@jsverse/transloco';
import { ServiceModel } from '../../../core/models/entities/service.model';
import { MindsoftServicesService } from '../../../core/services/mindsoft-services.service';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faPencil, faX} from "@fortawesome/free-solid-svg-icons";
import { DialogManagerService } from '../../../core/services/dialog-manager.service';

@Component({
  selector: 'app-all-services',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    MatExpansionModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    MatTableModule, 
    MatSortModule,
    FaIconComponent,
  ],
  templateUrl: './all-services.component.html',
  styleUrl: './all-services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllServicesComponent {
  protected readonly faPencil = faPencil;
  protected readonly faX = faX;

  private mindsoftServicesService = inject(MindsoftServicesService)
  private dialogManagerService = inject(DialogManagerService)
  private cdr = inject(ChangeDetectorRef)

  displayedColumns: string[] = ['description', 'category', 'price', 'actions'];
  dataSource!: MatTableDataSource<ServiceModel>;
  
  services: ServiceModel[] = []

  pageSize = 6; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  filterText = ''; // Texto de filtro
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.mindsoftServicesService.getAllServices().subscribe({
      next: (response) => {
        this.services = response;
        this.dataSource = new MatTableDataSource(this.services);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editService(id: number) {

  }

  deleteService(id: number) {
    this.dialogManagerService.openActionConfrimationDialog("¿Esta seguro que desea borrar este servicio?")
  }
}
