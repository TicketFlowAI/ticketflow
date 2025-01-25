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
import { UserRoleService } from '../api/servicios-mindsoftdev/user-role.service';
import { PermissionModel } from '../models/entities/permission.model';
import { UserRoleModel, IUserRolesModelResponse, IUserRoleModelResponse } from '../models/entities/user-role.model';

describe('UserManagementService', () => {
  let service: UserManagementService;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let userRoleServiceMock: jasmine.SpyObj<UserRoleService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let translocoServiceMock: jasmine.SpyObj<TranslocoService>;

  const mockUser = new UserModel(1, 'John', 'Doe', 'john.doe@example.com', 1, UserRoles.Admin, 'Company A');
  const mockUsers = [mockUser];

  const mockPermissions: PermissionModel[] = [
    new PermissionModel(1, 'Read'),
    new PermissionModel(2, 'Write'),
    new PermissionModel(3, 'Execute'),
  ];
  
  const mockUserRoles: UserRoleModel[] = [
    new UserRoleModel(1, 'Admin', mockPermissions),
    new UserRoleModel(2, 'Technician', [mockPermissions[0], mockPermissions[1]]),
    new UserRoleModel(3, 'Client', []),
  ];
  
  const mockUserRolesResponse: IUserRolesModelResponse = {
    success: true,
    data: mockUserRoles,
  };
  
  const mockUserRoleResponse: IUserRoleModelResponse = {
    success: true,
    data: mockUserRoles[0], 
  };

  beforeEach(() => {
    const userSpy = jasmine.createSpyObj('UserService', [
      'getMyUser',
      'getUsers',
      'getUser',
      'createUser',
      'updateUser',
      'deleteUser',
      'getDeletedUsers', // Agregado
      'disableToFactor', // Para reset2FA
      'restoreUser', // Para restoreDeletedUser
    ]);
  
    const userRoleSpy = jasmine.createSpyObj('UserRoleService', [
      'getUserRoles', // Para getAllUserRoles
      'getPermissions', // Para getAllPermissions
      'getUserRole', // Para getOneUserRole
      'updateUserRole', // Para editUserRole
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
        { provide: UserRoleService, useValue: userRoleSpy },
        { provide: MessageService, useValue: messageSpy },
        { provide: TranslocoService, useValue: translocoSpy },
      ],
    });

    service = TestBed.inject(UserManagementService);
    userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userRoleServiceMock = TestBed.inject(UserRoleService) as jasmine.SpyObj<UserRoleService>;
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

  it('should identify a technician level 1 user correctly', () => {
    service.currentUser.set({ ...mockUser, role: UserRoles.One });
    expect(service.isUserTechnician()).toBeTrue();
  });

  it('should identify a technician level 2 user correctly', () => {
    service.currentUser.set({ ...mockUser, role: UserRoles.Two });
    expect(service.isUserTechnician()).toBeTrue();
  });

  it('should identify a technician level 13user correctly', () => {
    service.currentUser.set({ ...mockUser, role: UserRoles.Three });
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

  it('should get all deleted users successfully', (done) => {
    const mockDeletedUsers = [
      new UserModel(1, 'John', 'Doe', 'john.doe@example.com', 1, UserRoles.Admin, 'Company A'),
      new UserModel(2, 'Jane', 'Smith', 'jane.smith@example.com', 1, UserRoles.Client, 'Company B'),
    ];
  
    userServiceMock.getDeletedUsers.and.returnValue(of({ success: true, data: mockDeletedUsers }));
  
    service.getDeletedUsers().subscribe((users) => {
      expect(users).toEqual(mockDeletedUsers);
      expect(userServiceMock.getDeletedUsers).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while getting deleted users', (done) => {
    userServiceMock.getDeletedUsers.and.returnValue(throwError(() => new Error('Error fetching deleted users')));
  
    service.getDeletedUsers().subscribe((users) => {
      expect(users).toEqual([]);
      expect(userServiceMock.getDeletedUsers).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).not.toHaveBeenCalled();
      done();
    });
  });
  
  it('should return an empty array if deleted users data is empty', (done) => {
    userServiceMock.getDeletedUsers.and.returnValue(of({ success: true, data: [] }));
  
    service.getDeletedUsers().subscribe((users) => {
      expect(users).toEqual([]);
      expect(userServiceMock.getDeletedUsers).toHaveBeenCalled();
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

  // reset2FA
  it('should reset 2FA successfully', (done) => {
    userServiceMock.disableToFactor.and.returnValue(of(new HttpResponse({ status: 200 })));

    service.reset2FA(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(userServiceMock.disableToFactor).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should handle error while resetting 2FA', (done) => {
    userServiceMock.disableToFactor.and.returnValue(throwError(() => new Error('Error resetting 2FA')));

    service.reset2FA(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(userServiceMock.disableToFactor).toHaveBeenCalledWith(1);
      done();
    });
  });

  // restoreDeletedUser
  it('should restore a deleted user successfully', (done) => {
    userServiceMock.restoreUser.and.returnValue(of(new HttpResponse({ status: 200 })));

    service.restoreDeletedUser(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(userServiceMock.restoreUser).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should handle error while restoring a deleted user', (done) => {
    userServiceMock.restoreUser.and.returnValue(throwError(() => new Error('Error restoring user')));

    service.restoreDeletedUser(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(userServiceMock.restoreUser).toHaveBeenCalledWith(1);
      done();
    });
  });

  // Pruebas faltantes utilizando los mocks existentes

  it('should reset 2FA successfully', (done) => {
    userServiceMock.disableToFactor.and.returnValue(of(new HttpResponse({ status: 204 })));

    service.reset2FA(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(userServiceMock.disableToFactor).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should handle error while resetting 2FA', (done) => {
    userServiceMock.disableToFactor.and.returnValue(throwError(() => new Error('Error resetting 2FA')));

    service.reset2FA(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(userServiceMock.disableToFactor).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should restore a deleted user successfully', (done) => {
    userServiceMock.restoreUser.and.returnValue(of(new HttpResponse({ status: 204 })));

    service.restoreDeletedUser(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(userServiceMock.restoreUser).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should handle error while restoring a deleted user', (done) => {
    userServiceMock.restoreUser.and.returnValue(throwError(() => new Error('Error restoring user')));

    service.restoreDeletedUser(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(userServiceMock.restoreUser).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should get all user roles successfully', (done) => {
    userRoleServiceMock.getUserRoles.and.returnValue(of(mockUserRolesResponse));
  
    service.getAllUserRoles().subscribe((roles) => {
      expect(roles).toEqual(mockUserRoles);
      expect(userRoleServiceMock.getUserRoles).toHaveBeenCalled();
      expect(translocoServiceMock.translateObject).not.toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while getting all user roles', (done) => {
    userRoleServiceMock.getUserRoles.and.returnValue(throwError(() => new Error('Error fetching user roles')));
  
    service.getAllUserRoles().subscribe((roles) => {
      expect(roles).toEqual([]);
      expect(userRoleServiceMock.getUserRoles).toHaveBeenCalled();
      done();
    });
  });
  
  it('should get one user role successfully', (done) => {
    userRoleServiceMock.getUserRole.and.returnValue(of(mockUserRoleResponse));
  
    const mock = new UserRoleModel(1, 'Admin', mockPermissions)

    service.getOneUserRole(1).subscribe((role) => {
      expect(role).toEqual(mock);
      expect(userRoleServiceMock.getUserRole).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should handle error while getting one user role', (done) => {
    userRoleServiceMock.getUserRole.and.returnValue(throwError(() => new Error('Error fetching user role')));
  
    service.getOneUserRole(1).subscribe((role) => {
      expect(role).toBeNull();
      expect(userRoleServiceMock.getUserRole).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should edit a user role successfully', (done) => {
    userRoleServiceMock.updateUserRole.and.returnValue(of(new HttpResponse({ status: 200 })));
  
    service.editUserRole(mockUserRoles[0]).subscribe((result) => {
      expect(result).toBeTrue();
      expect(userRoleServiceMock.updateUserRole).toHaveBeenCalledWith(mockUserRoles[0]);
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while editing a user role', (done) => {
    userRoleServiceMock.updateUserRole.and.returnValue(throwError(() => new Error('Error editing user role')));
  
    service.editUserRole(mockUserRoles[0]).subscribe((result) => {
      expect(result).toBeFalse();
      expect(userRoleServiceMock.updateUserRole).toHaveBeenCalledWith(mockUserRoles[0]);
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
});
