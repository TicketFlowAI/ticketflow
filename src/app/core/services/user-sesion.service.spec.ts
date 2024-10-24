import { TestBed } from '@angular/core/testing';
import { UserSessionService } from './user-sesion.service';
import { AuthService } from './auth.service';
import { UserService } from '../api/servicios-mindsoftdev/user.service';
import { UserModel } from '../models/entities/user.model';
import { of } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { signal } from '@angular/core';

describe('UserSessionService', () => {
  let service: UserSessionService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated'], { isAuthenticated: signal(false) });
    const userSpy = jasmine.createSpyObj('UserService', ['getUser', 'updateUser']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: UserService, useValue: userSpy },
        UserSessionService,
      ],
    });

    service = TestBed.inject(UserSessionService);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check initial user state and authenticate if status is OK', () => {
    const user = new UserModel();
    userServiceSpy.getUser.and.returnValue(of(user));

    service.checkUserInitialState();

    expect(userServiceSpy.getUser).toHaveBeenCalled();
    expect(authServiceSpy.isAuthenticated()).toBe(true);
  });

  it('should set isAuthenticated to false if user is unauthorized', () => {
    const user = new UserModel();
    userServiceSpy.getUser.and.returnValue(of(user));

    service.checkUserInitialState();

    expect(userServiceSpy.getUser).toHaveBeenCalled();
    expect(authServiceSpy.isAuthenticated()).toBe(false);
  });

  it('should fetch and set the current user if authenticated', () => {
    const user = new UserModel();
    userServiceSpy.getUser.and.returnValue(of(user));

    service.getUser();

    expect(userServiceSpy.getUser).toHaveBeenCalled();
    expect(service.currentUser()).toEqual(user);
  });
});
