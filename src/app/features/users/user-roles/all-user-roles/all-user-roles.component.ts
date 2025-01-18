import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFileContract, faFilePen, faBuilding, faPlus, faX, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { concatMap, tap, of } from 'rxjs';
import { UserRoleModel } from '../../../../core/models/entities/user-role.model';
import { DialogManagerService } from '../../../../core/services/dialog-manager.service';
import { UserManagementService } from '../../../../core/services/user-management.service';
import { GlobalSpinnerComponent } from '../../../../shared/components/global-spinner/global-spinner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-user-roles',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatExpansionModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FaIconComponent,
    FormsModule,
    GlobalSpinnerComponent,
    RouterLink
  ],
  templateUrl: './all-user-roles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllUserRolesComponent {
  protected readonly faFileContract = faFileContract;
  protected readonly faFilePen = faFilePen;
  protected readonly faBuilding = faBuilding;
  protected readonly faPlus = faPlus;
  protected readonly faX = faX;
  protected readonly faArrowLeft = faArrowLeft;

  private readonly userManagementService = inject(UserManagementService)
  private readonly dialogManagerService = inject(DialogManagerService)

  private readonly cdr = inject(ChangeDetectorRef)
  private readonly translocoService = inject(TranslocoService)

  userRoles: UserRoleModel[] = []
  filteredUserRoles: UserRoleModel[] = [];
  pagedUserRoles: UserRoleModel[] = [];

  pageSize = 6; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  filterText = ''; // Texto de filtro

  ngOnInit(): void {
    this.loadUserRoles();
  }

  private loadUserRoles() {
    this.userManagementService.getAllUserRoles().subscribe({
      next: (userRoles) => {
        this.userRoles = userRoles;
        this.filteredUserRoles = this.userRoles;
        this.updatePagedUserRoles();
        this.cdr.detectChanges();
      }
    });
  }

  onFilterChange(): void {
    const filterText = this.filterText.toLowerCase();

    this.filteredUserRoles = this.filteredUserRoles.filter(userRole =>
      userRole.name.toLowerCase().includes(filterText)
    );
    this.pageIndex = 0;
    this.updatePagedUserRoles();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedUserRoles();
  }

  private updatePagedUserRoles(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUserRoles = this.filteredUserRoles.slice(startIndex, endIndex);
  }

  deleteUserRole(name: string) {
    const deleteMessage = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.DELETE-ROLE');

    this.dialogManagerService.openActionConfirmationDialog(deleteMessage).pipe(
      concatMap((result) =>
        result ? this.handleDeleteUserRole(name) : this.handleCancelDelete()
      )
    ).subscribe();
  }

  private handleDeleteUserRole(roleName: string) {
    return this.userManagementService.deleteUserRole(roleName).pipe(
      tap(() => this.loadUserRoles())
    );
  }

  private handleCancelDelete() {
    return of(null);
  }

  openUserRoleManageDialog(user: UserRoleModel | null) {
    this.dialogManagerService.openManageUserRoleDialog(user).subscribe({
      next: (response) => {
        if (response) this.loadUserRoles()
      }
    })
  }

  openUserRoleInfoDialog(userRole: UserRoleModel) {
    this.dialogManagerService.openUserRoleInfoDialog(userRole)
  }
}
