import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faFileContract, faFilePen, faBuilding, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { MatIconModule } from '@angular/material/icon';
import { DialogManagerService } from '../../../core/services/dialog-manager.service';
import { FormsModule } from '@angular/forms';
import { UserManagementService } from '../../../core/services/user-management.service';
import { UserModel } from '../../../core/models/entities/user.model';
import { concatMap, of } from 'rxjs';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatExpansionModule,
    MatPaginatorModule,
    RouterLink,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FaIconComponent,
    FormsModule
  ],
  templateUrl: './all-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllUsersComponent {
  protected readonly faFileContract = faFileContract;
  protected readonly faFilePen = faFilePen;
  protected readonly faBuilding = faBuilding;
  protected readonly faPlus = faPlus;
  protected readonly faX = faX;

  private readonly userManagementService = inject(UserManagementService)
  private readonly dialogManagerService = inject(DialogManagerService)

  private readonly cdr = inject(ChangeDetectorRef)
  private readonly translocoService = inject(TranslocoService)

  users: UserModel[] = []
  filteredUsers: UserModel[] = [];
  pagedUsers: UserModel[] = [];

  pageSize = 6; // Tamaño de página por defecto
  pageIndex = 0; // Índice de la página actual
  filterText = ''; // Texto de filtro

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers() {
    this.userManagementService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = this.users;
        this.updatePagedUsers();
        this.cdr.detectChanges();
      }
    });
  }

  onFilterChange(): void {
    const filterText = this.filterText.toLowerCase();

    this.filteredUsers = this.filteredUsers.filter(user =>
      user.name.toLowerCase().includes(filterText) ||
      user.lastname.toLowerCase().includes(filterText) ||
      user.email.toLowerCase().includes(filterText)
    );
    this.pageIndex = 0;
    this.updatePagedUsers();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedUsers();
  }

  private updatePagedUsers(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  openUserInfoDialog(user: UserModel) {
    this.dialogManagerService.openUserInfoDialog(user)
  }

  deleteUsers(userId: number) {
    const deleteMessage = this.translocoService.translateObject('SHARED.DIALOGS.CONFIRMATION.DELETE-USER');
    
    this.dialogManagerService.openActionConfirmationDialog(deleteMessage).pipe(
      concatMap((result) => {
        if(result)
          return this.userManagementService.deleteUser(userId)
        else
          return of(null)
      })
    ).subscribe( (result) => { if(result) this.loadUsers() } )
  }

  openUserManageDialog(user: UserModel | null) {
    this.dialogManagerService.openManageUserDialog(user).subscribe(
      () => { this.loadUsers() }
    )
  }
}
