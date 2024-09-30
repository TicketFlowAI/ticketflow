import { CanActivateFn } from '@angular/router';

export const adminRoleGuard: CanActivateFn = (route, state) => {
  return true;
};
