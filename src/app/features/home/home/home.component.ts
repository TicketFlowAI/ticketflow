import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { OpenLoginDirective } from '../../../shared/directives/open-login.directive';
import { UserManagementService } from '../../../core/services/user-management.service';
import { RouterLink } from '@angular/router';
import { UserModel } from '../../../core/models/entities/user.model';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [OpenLoginDirective, RouterLink, TranslocoDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  public userManagementService = inject(UserManagementService);
  private cdr = inject(ChangeDetectorRef);
  public user: UserModel | null = null;

  constructor() {
    effect(() => {
      console.log(this.user)
      this.user = this.userManagementService.currentUser();
      this.cdr.markForCheck();
    });
  }
}
