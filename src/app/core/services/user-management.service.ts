import { inject, Injectable } from '@angular/core';
import { UserService } from '../api/servicios-mindsoftdev/user.service';
import { UserModel } from '../models/entities/user.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private userService = inject(UserService)

  getAllUsers(): Observable<UserModel[] | []> {
    return this.userService.getUsers().pipe(
      map((users) => users.data),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    )
  }

  getUserById(id: number): Observable<UserModel[] | []> {
    return this.userService.getUserById(id).pipe(
      map((users) => users.data),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    )
  }

  createUser(newUser: UserModel): Observable<boolean> {
    return this.userService.createUser(newUser).pipe(
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }

  editUser(editUser: UserModel): Observable<boolean> {
    return this.userService.updateUser(editUser).pipe(
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }

  deleteUser(id: number): Observable<boolean> {
    return this.userService.deleteUser(id).pipe(
      map(() => true),
      catchError(() => {
        return of(false)
      })
    )
  }
}
