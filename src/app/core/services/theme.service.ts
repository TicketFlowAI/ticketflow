import {inject, Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  //SERVICES
  private readonly cookieService = inject(CookieService)

  //PROPS N VARS
  private readonly THEME_KEY = 'theme'
  currentTheme$: BehaviorSubject<string> = new BehaviorSubject<string>(this.cookieService.get(this.THEME_KEY) || 'light');

  //METHODS
  setStartTheme(){
    if(this.cookieService.get(this.THEME_KEY) != ''){
      this.getSavedTheme();
    }
    else
      this.createTheme();
    document.documentElement.setAttribute('data-bs-theme', this.currentTheme$.getValue());
  }

  toggleTheme() {
    this.currentTheme$.next(this.currentTheme$.getValue() === 'light' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-bs-theme', this.currentTheme$.getValue());
    this.cookieService.set(this.THEME_KEY, this.currentTheme$.getValue())
  }

  private getSavedTheme() {
    const theme = this.cookieService.get(this.THEME_KEY);
    this.currentTheme$.next(theme);
  }

  private createTheme() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let theme = '';

    if(isDarkMode)
      theme = 'dark';
    else
      theme = 'light';

    this.cookieService.set(this.THEME_KEY, theme);
    this.currentTheme$.next(theme);
  }
}
