import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserRoleService } from './user-role.service';
import { environment } from '../../../../environments/environment';
import { IUserRolesModelResponse, IUserRoleModelResponse } from '../../models/entities/user-role.model';
import { IPermissionsModelResponse } from '../../models/entities/permission.model';

describe('UserRoleService', () => {
  let service: UserRoleService;
  let httpTestingController: HttpTestingController;

  const mockUserRolesResponse: IUserRolesModelResponse = {
    success: true,
    data: [
      { id: 1, name: 'Admin', permissions: [] },
      { id: 2, name: 'Technician', permissions: [] },
    ],
  };

  const mockPermissionsResponse: IPermissionsModelResponse = {
    success: true,
    data: [
      { id: 1, name: 'Read' },
      { id: 2, name: 'Write' },
    ],
  };

  const mockUserRoleResponse: IUserRoleModelResponse = {
    success: true,
    data: { id: 1, name: 'Admin', permissions: [] },
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
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all user roles', (done) => {
    service.getUserRoles().subscribe((response) => {
      expect(response).toEqual(mockUserRolesResponse);
      done();
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/roles`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserRolesResponse);
  });

  it('should get permissions', (done) => {
    service.getPermissions().subscribe((response) => {
      expect(response).toEqual(mockPermissionsResponse);
      done();
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/permissions`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPermissionsResponse);
  });

  it('should get a single user role by ID', (done) => {
    const userRoleId = 1;

    service.getUserRole(userRoleId).subscribe((response) => {
      expect(response).toEqual(mockUserRoleResponse);
      done();
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/roles/${userRoleId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserRoleResponse);
  });

  it('should update a user role', (done) => {
    const updatedUserRole = { id: 1, name: 'Updated Role', permissions: [] };

    service.updateUserRole(updatedUserRole).subscribe((response) => {
      expect(response.status).toBe(200);
      done();
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/roles/${updatedUserRole.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUserRole);

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should handle error when getting all user roles', (done) => {
    service.getUserRoles().subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error.message).toContain('500 Internal Server Error'); // Cambiar el mensaje a algo que el servidor devuelve.
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/roles`);
    expect(req.request.method).toBe('GET');
  
    req.flush('Http failure response', { status: 500, statusText: 'Internal Server Error' });
  });
  
  
  it('should handle error when getting permissions', (done) => {
    service.getPermissions().subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error.message).toContain('500 Internal Server Error'); // Cambiar el mensaje esperado.
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/permissions`);
    expect(req.request.method).toBe('GET');
  
    req.flush('Http failure response', { status: 500, statusText: 'Internal Server Error' });
  });
  
  
  it('should handle error when getting a user role by ID', (done) => {
    const userRoleId = 1;
  
    service.getUserRole(userRoleId).subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error.message).toContain('404 Not Found'); // Cambiar el mensaje esperado.
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/roles/${userRoleId}`);
    expect(req.request.method).toBe('GET');
  
    req.flush('Http failure response', { status: 404, statusText: 'Not Found' });
  });
  
  it('should handle error when updating a user role', (done) => {
    const updatedUserRole = { id: 1, name: 'Updated Role', permissions: [] };
  
    service.updateUserRole(updatedUserRole).subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error.message).toContain('400 Bad Request'); // Cambiar el mensaje esperado.
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/roles/${updatedUserRole.id}`);
    expect(req.request.method).toBe('PUT');
  
    req.flush('Http failure response', { status: 400, statusText: 'Bad Request' });
  });
});
