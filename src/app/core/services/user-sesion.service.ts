import { effect, inject, Injectable, signal } from '@angular/core';
import { UserModel } from '../models/entities/user.model';
import { UserService } from '../api/servicios-mindsoftdev/user.service';
import { AuthService } from './auth.service';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  //SERVICES
  private authService: AuthService = inject(AuthService)
  private userService = inject(UserService)

  //PROPS N VARIABLES
  currentUser = signal<UserModel>(new UserModel())

  constructor() {
    effect(() => {
      if(this.authService.isAuthenticated()) this.getUser();
    })
  }

  //METHODS
  checkUserInitialState() {
    this.userService.getUser().subscribe({
      next: (user) => {
        if(user){
          this.authService.isAuthenticated.set(true);
        }
        else {
          this.authService.isAuthenticated.set(false);
        }

      }
    })
  }

  getUser() {
    this.userService.getUser().subscribe({
      next: (user) => {
        if(user) this.currentUser.set(user);
      }
    })
  }
}
