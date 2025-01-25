import {inject, Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'XSRF-TOKEN';
  private readonly SESSION_KEY = 'mindsoft_ticketflow_session';
  private readonly cookieService = inject(CookieService)

  getToken(): string {
    const token = this.cookieService.get(this.TOKEN_KEY)
    if (token)  return token;
    return '';
  }

  tokenExists(): boolean {
    const token = this.cookieService.get(this.TOKEN_KEY)
    if (token) return true;
    return false;
  }

  clearToken() {
    this.cookieService.delete(this.TOKEN_KEY);
  }

  clearAll() {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();
      if (cookieName && cookieName !== 'theme') { 
        this.cookieService.delete(cookieName, '/'); 
      }
    });
  }
}
