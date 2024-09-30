import {inject, Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  cookieService = inject(CookieService)

  private readonly THEME_KEY = 'theme'
  currentTheme: string = 'light';

  setTheme(theme: string) {
    this.cookieService.set(this.THEME_KEY, theme)
  }

  getTheme() {
    return this.cookieService.get(this.THEME_KEY) || 'light'
  }
}
