import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'XSRF-TOKEN';

  constructor(private cookieService: CookieService) {
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
