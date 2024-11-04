import { HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class CustomHeadersService {
  private readonly tokenService = inject(TokenService)
  private headers: HttpHeaders = new HttpHeaders();

  addAppJson(): this {
    this.headers = this.headers.set('Content-Type', 'application/json');
    return this;
  }

  addXsrfToken(): this {
    const xsrfToken = this.tokenService.getToken();
    this.headers = this.headers.set('X-XSRF-TOKEN', xsrfToken || '');
    return this;
  }

  addCustomHeader(key: string, value: string): this {
    this.headers = this.headers.set(key, value);
    return this;
  }

  getHeaders(): HttpHeaders {
    return this.headers;
  }
}
