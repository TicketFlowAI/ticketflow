import {ChangeDetectionStrategy, Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {ScrollToTopInstantDirective} from "../../directives/scroll-to-top-instant.directive";
import {TranslocoDirective} from "@jsverse/transloco";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    ScrollToTopInstantDirective,
    TranslocoDirective,
    NgTemplateOutlet
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  authService: AuthService = inject(AuthService)
  isAuth = this.authService.isLoggedIn$.getValue();

  userName = ''

  @ViewChild('noAuthTemplate') NoAuthTemplate!: TemplateRef<any>
  @ViewChild('adminTemplate') AdminTemplate!: TemplateRef<any>
  @ViewChild('teamTemplate') TeamTemplate!: TemplateRef<any>
  @ViewChild('clientTemplate') ClientTemplate!: TemplateRef<any>

  ngOnInit() {
    this.selectNavBarTemplate()
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

  switchLanguage() {

  }
}
