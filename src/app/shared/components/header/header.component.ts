import {ChangeDetectionStrategy,ChangeDetectorRef,Component,effect,inject,OnInit,TemplateRef,ViewChild
} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {ScrollToTopInstantDirective} from "../../directives/scroll-to-top-instant.directive";
import {TranslocoDirective, TranslocoService} from "@jsverse/transloco";
import {AuthService} from "../../../core/services/auth.service";
import {ThemeService} from "../../../core/services/theme.service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faFlag, faMoon, faSun, faUser, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {MatButton} from "@angular/material/button";
import {OpenLoginDirective} from "../../directives/open-login.directive";
import { IUserModel } from '../../../core/models/entities/user.model';
import { UserSessionService } from '../../../core/services/user-sesion.service';

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

  user!: IUserModel;

  userSessionService: UserSessionService = inject(UserSessionService)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)
  authService: AuthService = inject(AuthService)
  translocoService: TranslocoService = inject(TranslocoService)
  themeService: ThemeService = inject(ThemeService)

  isAuthenticated = false;
  userName = ''
  userRole = ''


  @ViewChild('noAuthTemplate') NoAuthTemplate!: TemplateRef<any>
  @ViewChild('adminTemplate') AdminTemplate!: TemplateRef<any>
  @ViewChild('teamTemplate') TeamTemplate!: TemplateRef<any>
  @ViewChild('clientTemplate') ClientTemplate!: TemplateRef<any>

  constructor() {
    effect(() => {
      this.isAuthenticated = this.authService.isAuthenticated()
      this.userName = this.userSessionService.currentUser().name + ' ' + this.userSessionService.currentUser().lastname;
      this.userRole = 'Admin';
      this.cdr.detectChanges();
    });

    effect(() => {
      this.userName = this.userSessionService.currentUser().name + ' ' + this.userSessionService.currentUser().lastname;
      this.userRole = 'Admin';
      this.cdr.detectChanges();
    });
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
  }
}
