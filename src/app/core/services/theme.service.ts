import {inject, Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private cookieService = inject(CookieService)

  private readonly THEME_KEY = 'theme'
  currentTheme$: BehaviorSubject<string> = new BehaviorSubject<string>(this.cookieService.get(this.THEME_KEY) || 'light');

  setStartTheme(){
    document.documentElement.setAttribute('data-bs-theme', this.currentTheme$.getValue());
  }
  toggleTheme() {
    this.currentTheme$.next(this.currentTheme$.getValue() === 'light' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-bs-theme', this.currentTheme$.getValue());
    this.cookieService.set(this.THEME_KEY, this.currentTheme$.getValue())
  }
}
