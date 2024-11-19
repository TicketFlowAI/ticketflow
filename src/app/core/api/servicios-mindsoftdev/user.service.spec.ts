import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '../../../../environments/environment';
import {
  IUsersModelResponse,
  IUserModelResponse,
  UserModel,
} from '../../models/entities/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  const mockUsersResponse: IUsersModelResponse = {
    success: true,
    data: [
      new UserModel(1, 'John', 'Doe', 'john.doe@example.com', 1, 'Admin', 'Company A'),
      new UserModel(2, 'Jane', 'Smith', 'jane.smith@example.com', 2, 'Technician', 'Company B'),
    ],
  };

  const mockUserResponse: IUserModelResponse = {
    success: true,
    data: new UserModel(1, 'John', 'Doe', 'john.doe@example.com', 1, 'Admin', 'Company A'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    service.getUsers().subscribe((response) => {
      expect(response).toEqual(mockUsersResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsersResponse);
  });

  it('should get my user', () => {
    service.getMyUser().subscribe((response) => {
      expect(response).toEqual(mockUserResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/user`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserResponse);
  });

  it('should get a user by ID', () => {
    const userId = 1;

    service.getUser(userId).subscribe((response) => {
      expect(response).toEqual(mockUserResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserResponse);
  });

  it('should create a user', () => {
    const newUser = new UserModel(0, 'Alice', 'Johnson', 'alice.johnson@example.com', 3, 'Client', 'Company C');

    service.createUser(newUser).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);

    req.flush({}, { status: 201, statusText: 'Created' });
  });

  it('should update a user', () => {
    const updatedUser = new UserModel(1, 'John Updated', 'Doe', 'john.doe@example.com', 1, 'Admin', 'Company A');

    service.updateUser(updatedUser).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users/${updatedUser.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser);

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should delete a user by ID', () => {
    const userId = 1;

    service.deleteUser(userId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users/${userId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({}, { status: 200, statusText: 'OK' });
  });
});
