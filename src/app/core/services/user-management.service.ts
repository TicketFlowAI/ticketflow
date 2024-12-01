import { inject, Injectable, signal } from '@angular/core';
import { UserService } from '../api/servicios-mindsoftdev/user.service';
import { UserModel, UserRoles } from '../models/entities/user.model';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';
import { MessageService } from '../../shared/services/message.service';
import { SpinnerService } from '../../shared/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private readonly userService = inject(UserService)

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

  addUser(newUser: UserModel): Observable<boolean> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.userService.createUser(newUser).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  editUser(editUser: UserModel): Observable<boolean> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.userService.updateUser(editUser).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }

  deleteUser(id: number): Observable<boolean> {
    this.spinnerService.showGlobalSpinner({fullscreen: false, size: 100, hasBackdrop: true});

    return this.userService.deleteUser(id).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      }),
      finalize(() => {
        this.spinnerService.hideDialogSpinner();
      })
    )
  }
}
