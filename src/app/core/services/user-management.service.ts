import { inject, Injectable, signal } from '@angular/core';
import { UserService } from '../api/servicios-mindsoftdev/user.service';
import { UserModel, UserRoles } from '../models/entities/user.model';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';
import { MessageService } from '../../shared/services/message.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { UserRoleService } from '../api/servicios-mindsoftdev/user-role.service';
import { UserRoleModel } from '../models/entities/user-role.model';
import { PermissionModel } from '../models/entities/permission.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private readonly userService = inject(UserService)
  private readonly userRoleService = inject(UserRoleService)

  private readonly messageService = inject(MessageService)
  private readonly spinnerService = inject(SpinnerService)
  private readonly translocoService = inject(TranslocoService)

  public currentUser = signal<UserModel | null>(null)

  isUserAdmin() {
    if(this.currentUser() != null) 
    {
      return this.currentUser()?.role === UserRoles.Admin;
    }
    else
      return false;
  }

  isUserTechnician() {
    if(this.currentUser() != null)
      return this.currentUser()?.role === UserRoles.Technician;
    else
      return false;
  }

  isUserTeam() {
    if(this.currentUser() != null)
      return this.currentUser()?.role === UserRoles.Technician || this.currentUser()?.role === UserRoles.Admin;
    else
      return false;
  }

  isUserClient() {
    if(this.currentUser() != null) 
      return this.currentUser()?.role === UserRoles.Client;
    else
      return false;
  }

  getMyUser() {
    return this.userService.getMyUser().pipe(
      map((response) => {
        if(response.success)
          return response.data;
        else
          return null;
      }),
      catchError(() => {
        return of(null);
      })
    )
  }

  getAllUsers(): Observable<UserModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});

    return this.userService.getUsers().pipe(
      map((users) => users.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  getOneUser(id: number): Observable<UserModel | null> {
    return this.userService.getUser(id).pipe(
      map((user) => user.data),
      catchError(() => {
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  getDeletedUsers(): Observable<UserModel[] | []> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.userService.getDeletedUsers().pipe(
      map((user) => {
        console.log(user)
        return user.data
      }),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  addUser(newUser: UserModel): Observable<boolean> {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.userService.createUser(newUser).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.USER');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.CREATE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  editUser(editUser: UserModel): Observable<boolean> {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.userService.updateUser(editUser).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.USER');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  deleteUser(id: number): Observable<boolean> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.userService.deleteUser(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.USER');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.DELETE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  reset2FA(id: number): Observable<boolean> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.userService.disableToFactor(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.USER-2FA-RESET-SUCCESS');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CUSTOM.USER-2FA-RESET-ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  restoreDeletedUser(id: number): Observable<boolean> {
    this.spinnerService.showGlobalSpinner({ fullscreen: false, size: 100, hasBackdrop: true });

    return this.userService.restoreUser(id).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.RESTORE.USER');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.RESTORE.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  getAllUserRoles(): Observable<UserRoleModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});

    return this.userRoleService.getUserRoles().pipe(
      map((users) => users.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  getAllPermissions(): Observable<PermissionModel[] | []> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: false});

    return this.userRoleService.getPermissions().pipe(
      map((permissions) => permissions.data),
      catchError(() => {
        return of([]);
      }),
      finalize(() => {
        this.spinnerService.hideGlobalSpinner();
      })
    )
  }

  getOneUserRole(id: number): Observable<UserRoleModel | null> {
    return this.userRoleService.getUserRole(id).pipe(
      map((user) => user.data),
      catchError(() => {
        return of(null);
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  editUserRole(editUserRole: UserRoleModel): Observable<boolean> {
    this.spinnerService.showDialogSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.userRoleService.updateUserRole(editUserRole).pipe(
      map(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.ROLE');
        this.messageService.addSuccessMessage(transate)
        return true
      }),
      catchError(() => {
        const transate = this.translocoService.translateObject('SHARED.TOASTS.CRUD.EDIT.ERROR');
        this.messageService.addErrorMessage(transate)
        return of(false)
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }
}
