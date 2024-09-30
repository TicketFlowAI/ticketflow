import { CanActivateFn } from '@angular/router';

export const clientRoleGuard: CanActivateFn = (route, state) => {
  return true;
};
