import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AsyncPipe, NgOptimizedImage, NgTemplateOutlet } from "@angular/common";
import { ScrollToTopInstantDirective } from "../../directives/scroll-to-top-instant.directive";
import { TranslocoDirective, TranslocoService } from "@jsverse/transloco";
import { AuthService } from "../../../core/services/auth.service";
import { ThemeService } from "../../../core/services/theme.service";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faFlag, faMoon, faSun, faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { MatButton } from "@angular/material/button";
import { OpenLoginDirective } from "../../directives/open-login.directive";
import { UserManagementService } from '../../../core/services/user-management.service';
import { UserModel } from '../../../core/models/entities/user.model';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    ScrollToTopInstantDirective,
    TranslocoDirective,
    NgTemplateOutlet,
    AsyncPipe,
    FaIconComponent,
    MatButton,
    OpenLoginDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  protected readonly faSun = faSun;
  protected readonly faMoon = faMoon;
  protected readonly faFlag = faFlag;
  protected readonly faUser = faUser;
  protected readonly faSignInAlt = faSignInAlt;

  public readonly userManagementService: UserManagementService = inject(UserManagementService)
  private readonly authService: AuthService = inject(AuthService)
  private readonly messageService = inject(MessageService)
  private readonly router: Router = inject(Router)
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef)
  private readonly translocoService: TranslocoService = inject(TranslocoService)
  public readonly themeService: ThemeService = inject(ThemeService)

  currentUser: UserModel | null = null

  constructor() {
    effect(() => {
      this.onEffectCurrentUser()
    });
  }

  onEffectCurrentUser() {
    this.currentUser = this.userManagementService.currentUser();
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.themeService.setStartTheme()
  }

  closeNavbar() {
    const navbar = document.getElementById('navbarNav');
    if (navbar?.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }

  switchLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);

  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/')
    this.cdr.detectChanges()
  }
}
