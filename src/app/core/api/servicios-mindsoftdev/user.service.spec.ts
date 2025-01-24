import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserRoleService } from './user-role.service';
import { environment } from '../../../../environments/environment';
import {
  IUserRolesModelResponse,
  IUserRoleModelResponse,
  UserRoleModel,
} from '../../models/entities/user-role.model';

describe('UserRoleService', () => {
  let service: UserRoleService;
  let httpTestingController: HttpTestingController;

  const mockUserRolesResponse: IUserRolesModelResponse = {
    success: true,
    data: [
      new UserRoleModel(1, 'Admin', []),
      new UserRoleModel(2, 'Technician', []),
    ],
  };

  const mockUserRoleResponse: IUserRoleModelResponse = {
    success: true,
    data: new UserRoleModel(1, 'Admin', []),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserRoleService],
    });
    service = TestBed.inject(UserRoleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all user roles', () => {
    service.getUserRoles().subscribe((response) => {
      expect(response).toEqual(mockUserRolesResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/roles`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserRolesResponse);
  });

  it('should get permissions', () => {
    const mockPermissionsResponse = { success: true, data: [] };
    service.getPermissions().subscribe((response) => {
      expect(response).toEqual(mockPermissionsResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/permissions`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPermissionsResponse);
  });

  it('should get a user role by ID', () => {
    const roleId = 1;

    service.getUserRole(roleId).subscribe((response) => {
      expect(response).toEqual(mockUserRoleResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/roles/${roleId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserRoleResponse);
  });

  it('should update a user role', () => {
    const updatedUserRole = new UserRoleModel(1, 'Updated Admin', []);

    service.updateUserRole(updatedUserRole).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/roles/${updatedUserRole.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUserRole);

    req.flush({}, { status: 200, statusText: 'OK' });
  });
});
