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
import {faFlag, faMoon, faSun} from "@fortawesome/free-solid-svg-icons";

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
    FaIconComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, AfterViewInit {
  translocoService: TranslocoService = inject(TranslocoService)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)
  authService: AuthService = inject(AuthService)
  themeService: ThemeService = inject(ThemeService)


  isAuth = this.authService.isLoggedIn$.getValue();

  userName = ''

  @ViewChild('noAuthTemplate') NoAuthTemplate!: TemplateRef<any>
  @ViewChild('adminTemplate') AdminTemplate!: TemplateRef<any>
  @ViewChild('teamTemplate') TeamTemplate!: TemplateRef<any>
  @ViewChild('clientTemplate') ClientTemplate!: TemplateRef<any>

  ngOnInit() {
    this.themeService.setStartTheme()
  }

  ngAfterViewInit() {
    this.selectNavBarTemplate()
    this.cdr.detectChanges()
  }

  selectNavBarTemplate() {
    if(this.isAuth) {
      switch (this.authService.getUserRole()) {
        case  'admin':
          return this.AdminTemplate;
        case  'team':
          return this.TeamTemplate;
        case  'client':
          return this.ClientTemplate;
        default:
          return this.NoAuthTemplate;
      }
    }
    else
      return this.NoAuthTemplate;
  }

  switchLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  protected readonly faSun = faSun;
  protected readonly faMoon = faMoon;
  protected readonly faFlag = faFlag;
}
