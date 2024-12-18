import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UserManagementService } from './user-management.service';
import { UserService } from '../api/servicios-mindsoftdev/user.service';
import { MessageService } from '../../shared/services/message.service';
import { TranslocoService } from '@jsverse/transloco';
import { UserModel, UserRoles } from '../models/entities/user.model';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../transloco-loader';

describe('UserManagementService', () => {
  let service: UserManagementService;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let translocoServiceMock: jasmine.SpyObj<TranslocoService>;

  const mockUser = new UserModel(1, 'John', 'Doe', 'john.doe@example.com', 1, UserRoles.Admin, 'Company A');
  const mockUsers = [mockUser];

  beforeEach(() => {
    const userSpy = jasmine.createSpyObj('UserService', [
      'getMyUser',
      'getUsers',
      'getUser',
      'createUser',
      'updateUser',
      'deleteUser',
    ]);
    const messageSpy = jasmine.createSpyObj('MessageService', ['addSuccessMessage', 'addErrorMessage']);
    const translocoSpy = jasmine.createSpyObj('TranslocoService', ['translateObject']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTransloco({
          config: {
            availableLangs: ['es', 'en'],
            defaultLang: 'es',
            reRenderOnLangChange: true,
            prodMode: !isDevMode(),
          },
          loader: TranslocoHttpLoader,
        }),
        { provide: UserService, useValue: userSpy },
        { provide: MessageService, useValue: messageSpy },
        { provide: TranslocoService, useValue: translocoSpy },
      ],
    });

    service = TestBed.inject(UserManagementService);
    userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    messageServiceMock = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    translocoServiceMock = TestBed.inject(TranslocoService) as jasmine.SpyObj<TranslocoService>;
  });

  it('should identify an admin user correctly', () => {
    service.currentUser.set(mockUser);
    expect(service.isUserAdmin()).toBeTrue();
  });

  it('should identify a technician user correctly', () => {
    service.currentUser.set({ ...mockUser, role: UserRoles.Technician });
    expect(service.isUserTechnician()).toBeTrue();
  });

  it('should identify a team user with admin Role correctly', () => {
    service.currentUser.set({ ...mockUser, role: UserRoles.Admin });
    expect(service.isUserTeam()).toBeTrue();
  });

  it('should identify a team user with technician Role correctly', () => {
    service.currentUser.set({ ...mockUser, role: UserRoles.Technician });
    expect(service.isUserTeam()).toBeTrue();
  });
  
  it('should identify a client user correctly', () => {
    service.currentUser.set({ ...mockUser, role: UserRoles.Client });
    expect(service.isUserClient()).toBeTrue();
  });

  it('should return false for role checks if currentUser is null', () => {
    service.currentUser.set(null);
    expect(service.isUserAdmin()).toBeFalse();
    expect(service.isUserTechnician()).toBeFalse();
    expect(service.isUserTeam()).toBeFalse();
    expect(service.isUserClient()).toBeFalse();
  });

  it('should get the current user if the response is successfully', (done) => {
    userServiceMock.getMyUser.and.returnValue(of({ success: true, data: mockUser }));

    service.getMyUser().subscribe((user) => {
      expect(user).toEqual(mockUser);
      expect(userServiceMock.getMyUser).toHaveBeenCalled();
      done();
    });
  });

  it('should not get the current user if the response is not successfully', (done) => {
    userServiceMock.getMyUser.and.returnValue(of({ success: false, data: mockUser }));

    service.getMyUser().subscribe((user) => {
      expect(user).toEqual(null);
      expect(userServiceMock.getMyUser).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting the current user', (done) => {
    userServiceMock.getMyUser.and.returnValue(throwError(() => new Error('Error fetching current user')));

    service.getMyUser().subscribe((user) => {
      expect(user).toBeNull();
      expect(userServiceMock.getMyUser).toHaveBeenCalled();
      done();
    });
  });

  it('should get all users successfully', (done) => {
    userServiceMock.getUsers.and.returnValue(of({ success: true, data: mockUsers }));

    service.getAllUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
      expect(userServiceMock.getUsers).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting all users', (done) => {
    userServiceMock.getUsers.and.returnValue(throwError(() => new Error('Error fetching users')));

    service.getAllUsers().subscribe((users) => {
      expect(users).toEqual([]);
      expect(userServiceMock.getUsers).toHaveBeenCalled();
      done();
    });
  });

  it('should get one user successfully', (done) => {
    userServiceMock.getUser.and.returnValue(of({ success: true, data: mockUser }));

    service.getOneUser(1).subscribe((user) => {
      expect(user).toEqual(mockUser);
      expect(userServiceMock.getUser).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should handle error while getting one user', (done) => {
    userServiceMock.getUser.and.returnValue(throwError(() => new Error('Error fetching user')));

    service.getOneUser(1).subscribe((user) => {
      expect(user).toBeNull();
      expect(userServiceMock.getUser).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should add a user successfully', (done) => {
    userServiceMock.createUser.and.returnValue(of(new HttpResponse({ status: 201 })));

    service.addUser(mockUser).subscribe((result) => {
      expect(result).toBeTrue();
      expect(userServiceMock.createUser).toHaveBeenCalledWith(mockUser);
      done();
    });
  });

  it('should handle error while adding a user', (done) => {
    userServiceMock.createUser.and.returnValue(throwError(() => new Error('Error creating user')));

    service.addUser(mockUser).subscribe((result) => {
      expect(result).toBeFalse();
      expect(userServiceMock.createUser).toHaveBeenCalledWith(mockUser);
      done();
    });
  });

  // Edit User
  it('should edit a user successfully', (done) => {
    userServiceMock.updateUser.and.returnValue(of(new HttpResponse({ status: 201 })));

    service.editUser(mockUser).subscribe((result) => {
      expect(result).toBeTrue();
      expect(userServiceMock.updateUser).toHaveBeenCalledWith(mockUser);
      done();
    });
  });

  it('should handle error while editing a user', (done) => {
    userServiceMock.updateUser.and.returnValue(throwError(() => new Error('Error updating user')));
    
    service.editUser(mockUser).subscribe((result) => {
      expect(result).toBeFalse();
      expect(userServiceMock.updateUser).toHaveBeenCalledWith(mockUser);
      done();
    });
  });

  it('should delete a user successfully', (done) => {
    userServiceMock.deleteUser.and.returnValue(of(new HttpResponse({ status: 201 })));

    service.deleteUser(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(userServiceMock.deleteUser).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should handle error while deleting a user', (done) => {
    userServiceMock.deleteUser.and.returnValue(throwError(() => new Error('Error deleting user')));

    service.deleteUser(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(userServiceMock.deleteUser).toHaveBeenCalledWith(1);
      done();
    });
  });
});
