import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserManagementService } from '../services/user-management.service';

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const userManagementService = inject(UserManagementService)
  const router = inject(Router);

  const currentUser = userManagementService.currentUser();

  if (!currentUser) {
    router.navigate(['/']);
    return false;
  }

  return userManagementService.isUserAdmin();
};