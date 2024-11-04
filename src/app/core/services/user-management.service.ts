import { inject, Injectable, signal } from '@angular/core';
import { UserService } from '../api/servicios-mindsoftdev/user.service';
import { UserModel, UserRoles } from '../models/entities/user.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private readonly userService = inject(UserService)

  public currentUser = signal<UserModel | null>(null)

  isUserAdmin() {
    if(this.currentUser() != null)
      return this.currentUser()?.role === UserRoles.Admin;
    else
      return false;
  }

  isUserTechnician() {
    if(this.currentUser() != null)
      return this.currentUser()?.role === UserRoles.Technician;
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
    return this.userService.getUsers().pipe(
      map((users) => users.data),
      catchError(() => {
        return of([]);
      })
    )
  }

  getOneUser(id: number): Observable<UserModel | null> {
    return this.userService.getUser(id).pipe(
      map((user) => user.data),
      catchError(() => {
        return of(null);
      })
    )
  }

  addUser(newUser: UserModel): Observable<boolean> {
    return this.userService.createUser(newUser).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    )
  }

  editUser(editUser: UserModel): Observable<boolean> {
    return this.userService.updateUser(editUser).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    )
  }

  deleteUser(id: number): Observable<boolean> {
    return this.userService.deleteUser(id).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    )
  }
}
