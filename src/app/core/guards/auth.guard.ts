import { CanActivateFn, Router } from '@angular/router';
import { UserManagementService } from '../services/user-management.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userManagementService = inject(UserManagementService);
  const router = inject(Router);

  let currentUser = userManagementService.currentUser();
  let hasAccess = false
  const intervalMaxAttempts = 2;
  const intervalSeconds = 1;
  let intervalAttempts = 0;

  //No refresh Navigation
  if (currentUser) return true;

  //On refresh
  return new Promise<boolean>((resolve) => {
    const interval = setInterval(() => {
      intervalAttempts++;

      currentUser = userManagementService.currentUser();
      if ((intervalAttempts >= intervalMaxAttempts)) {
        clearInterval(interval);
        router.navigate(['/'])
        resolve(false)
      }

      if (currentUser) {
        clearInterval(interval);
        resolve(true);
      }
    }, intervalSeconds * 1000);
  });
};
