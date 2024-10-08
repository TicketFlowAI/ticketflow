import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild
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
export class HeaderComponent implements OnInit, AfterViewInit {

  protected readonly faSun = faSun;
  protected readonly faMoon = faMoon;
  protected readonly faFlag = faFlag;
  protected readonly faUser = faUser;
  protected readonly faSignInAlt = faSignInAlt;

  translocoService: TranslocoService = inject(TranslocoService)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)
  authService: AuthService = inject(AuthService)
  themeService: ThemeService = inject(ThemeService)

  selectedTemplate!: TemplateRef<any>

  isAuth = this.authService.isLoggedIn$.getValue();

  userName = ''

  @ViewChild('noAuthTemplate') NoAuthTemplate!: TemplateRef<any>
  @ViewChild('adminTemplate') AdminTemplate!: TemplateRef<any>
  @ViewChild('teamTemplate') TeamTemplate!: TemplateRef<any>
  @ViewChild('clientTemplate') ClientTemplate!: TemplateRef<any>

  ngOnInit() {
    this.selectNavBarTemplate()
    this.themeService.setStartTheme()
  }

  ngAfterViewInit() {
    this.selectNavBarTemplate()

    this.cdr.detectChanges()
  }

  selectNavBarTemplate() {
    this.selectedTemplate = this.NoAuthTemplate;
    
    if(this.isAuth) {
      switch (Math.random().toString()) {
        case  'admin':
          this.selectedTemplate = this.AdminTemplate;
          break;
        case  'team':
          this.selectedTemplate = this.TeamTemplate;
          break;
        case  'client':
          this.selectedTemplate = this.ClientTemplate;
          break;
        default:
          this.selectedTemplate = this.NoAuthTemplate;
          break;
      }
    }
    else
      this.selectedTemplate = this.NoAuthTemplate;
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
}
