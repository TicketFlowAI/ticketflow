import { CanActivateFn } from '@angular/router';

export const teamRoleGuard: CanActivateFn = (route, state) => {
  return true;
};
