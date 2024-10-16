import { TestBed } from '@angular/core/testing';
import { UserSessionService } from './user-sesion.service';
import { AuthService } from './auth.service';
import { UserService } from '../api/servicios-mindsoftdev/user.service';
import { UserModel } from '../models/entities/user.model';
import { of } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';

describe('UserSessionService', () => {
  let service: UserSessionService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
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
    const response = new HttpResponse({ status: HttpStatusCode.Ok });
    userServiceSpy.getUser.and.returnValue(of(response));

    service.checkUserInitialState();

    expect(userServiceSpy.getUser).toHaveBeenCalled();
    expect(authServiceSpy.isAuthenticated.set).toHaveBeenCalledWith(true);
  });

  it('should set isAuthenticated to false if user is unauthorized', () => {
    const response = new HttpResponse({ status: HttpStatusCode.Unauthorized });
    userServiceSpy.getUser.and.returnValue(of(response));

    service.checkUserInitialState();

    expect(userServiceSpy.getUser).toHaveBeenCalled();
    expect(authServiceSpy.isAuthenticated.set).toHaveBeenCalledWith(false);
  });

  it('should fetch and set the current user if authenticated', () => {
    const user = new UserModel();
    const response = new HttpResponse({ status: HttpStatusCode.Ok, body: user });
    userServiceSpy.getUser.and.returnValue(of(response));

    service.getUser();

    expect(userServiceSpy.getUser).toHaveBeenCalled();
    expect(service.currentUser()).toEqual(user);
  });

  it('should update the current user info', () => {
    const updatedUser = new UserModel();
    userServiceSpy.updateUser.and.returnValue(of(updatedUser));

    service.updateMyPersonalInfo(updatedUser);

    expect(userServiceSpy.updateUser).toHaveBeenCalledWith(updatedUser);
    expect(service.currentUser()).toEqual(updatedUser);
  });
});
