import { CanActivateFn, Router } from '@angular/router';
import { UserManagementService } from '../services/user-management.service';
import { inject } from '@angular/core';

export const technicianRoleGuard: CanActivateFn = () => {
  const userManagementService = inject(UserManagementService);
  const router = inject(Router);

  let currentUser = userManagementService.currentUser();
  let hasAccess = false
  const intervalMaxAttempts = 2;
  const intervalSeconds = 1;
  let intervalAttempts = 0;

  //No refresh Navigation
  if (currentUser) {
    hasAccess = userManagementService.isUserTechnician();

    if (!hasAccess) router.navigate(['/']);

    return hasAccess;
  }

  //On refresh
  return new Promise<boolean>((resolve) => {
    const interval = setInterval(() => {
      intervalAttempts++;
      
      currentUser = userManagementService.currentUser();
      if (currentUser || (intervalAttempts >= intervalMaxAttempts)) {
        clearInterval(interval);
        hasAccess  = userManagementService.isUserTechnician();
        
        if (!hasAccess) router.navigate(['/']);

        resolve(hasAccess);
      }
    }, intervalSeconds * 1000);
  });
};