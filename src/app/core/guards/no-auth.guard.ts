import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const isAuthenticated = tokenService.tokenExists();

  if (isAuthenticated) {
    // Redirige al home si el usuario está autenticado
    router.navigate(['/']);
    return false;
  }

  // Permite acceso si el usuario no está autenticado
  return true;
};
