import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth-token';

  constructor(private cookieService: CookieService) {
  }

  setToken(token: string) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    const cookieOptions: any = {
      expires,
      sameSite: 'Strict'
    };

    if (window.location.protocol === 'https:') {
      cookieOptions.secure = true;
    }

    if (this.getToken()) {
      this.clearToken()
    }

    this.cookieService.set(this.TOKEN_KEY, token, cookieOptions);
  }

  getToken(): string {
    const token = this.cookieService.get(this.TOKEN_KEY)

    if (token)  return token;

    return '';
  }

  clearToken() {
    this.cookieService.delete(this.TOKEN_KEY);
  }
}
