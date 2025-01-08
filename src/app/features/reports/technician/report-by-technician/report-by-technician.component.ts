import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faFileContract, faFilePen, faBuilding, faPlus, faX, faFileLines, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { MatIconModule } from '@angular/material/icon';
import { DialogManagerService } from '../../../../core/services/dialog-manager.service';
import { FormsModule } from '@angular/forms';
import { UserManagementService } from '../../../../core/services/user-management.service';
import { UserModel } from '../../../../core/models/entities/user.model';
import { GlobalSpinnerComponent } from "../../../../shared/components/global-spinner/global-spinner.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'report-by-technician',
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
    RouterLink,
    GlobalSpinnerComponent
  ],
  templateUrl: './report-by-technician.component.html',
  styleUrl: './report-by-technician.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportByTechnicianComponent {
  protected readonly faFileContract = faFileContract;
  protected readonly faFilePen = faFilePen;
  protected readonly faBuilding = faBuilding;
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faPlus = faPlus;
  protected readonly faX = faX;
  protected readonly faFileLines = faFileLines;

  private readonly userManagementService = inject(UserManagementService)
  private readonly dialogManagerService = inject(DialogManagerService)

  private readonly cdr = inject(ChangeDetectorRef)
  private readonly translocoService = inject(TranslocoService)

  users: UserModel[] = []
  filteredUsers: UserModel[] = [];
  pagedUsers: UserModel[] = [];

  pageSize = 6;
  pageIndex = 0;
  filterText = ''; 

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers() {
    this.userManagementService.getAllUsers().subscribe({
      next: (users) => {
        this.users = this.filterTechnicianUsers(users);
        this.filteredUsers = this.users;
        this.updatePagedUsers();
        this.cdr.detectChanges();
      }
    });
  }

  public showAdminElements() {
    return this.userManagementService.isUserAdmin()
  }

  private filterTechnicianUsers(users : UserModel[] ) {
    return users.filter(u => u.role == 'technician')
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

  showTechnicianReport(user: UserModel | null) {
    this.dialogManagerService.openManageUserDialog(user).subscribe({
      next: (response) => {
         if(response) this.loadUsers() 
      }
    })
  }
}
