import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '../../../../environments/environment';
import { IUserModelResponse, IUsersModelResponse, UserModel } from '../../models/entities/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  const mockUsersResponse: IUsersModelResponse = {
    success: true,
    data: [
      new UserModel(1, 'John', 'Doe', 'john.doe@example.com', 1, 'admin', '', ''),
      new UserModel(2, 'Jane', 'Smith', 'jane.smith@example.com', 1, 'technician', '', ''),
    ],
  };

  const mockUserResponse: IUserModelResponse = {
    success: true,
    data: new UserModel(1, 'John', 'Doe', 'john.doe@example.com', 1, 'admin', '', ''),
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
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    service.getUsers().subscribe((response) => {
      expect(response).toEqual(mockUsersResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsersResponse);
  });

  it('should get the current user (my user)', () => {
    service.getMyUser().subscribe((response) => {
      expect(response).toEqual(mockUserResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/user`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserResponse);
  });

  it('should get a single user by ID', () => {
    const userId = 1;

    service.getUser(userId).subscribe((response) => {
      expect(response).toEqual(mockUserResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserResponse);
  });

  it('should get deleted users', () => {
    service.getDeletedUsers().subscribe((response) => {
      expect(response).toEqual(mockUsersResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsersResponse);
  });

  it('should create a user', () => {
    const newUser = new UserModel(1, 'John', 'Doe', 'john.doe@example.com', 1, 'admin', '', '');

    service.createUser(newUser).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);

    req.flush({}, { status: 201, statusText: 'Created' });
  });

  it('should update a user', () => {
    const updatedUser = new UserModel(1, 'John', 'Doe', 'john.doe@example.com', 1, 'admin', '', '');

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

  it('should disable two-factor authentication for a user', () => {
    const userId = 1;

    service.disableToFactor(userId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users/${userId}/disable-two-factor`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({});

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should restore a user by ID', () => {
    const userId = 1;
  
    service.restoreUser(userId).subscribe((response) => {
      expect(response.status).toBe(200); // Verifica que el código de estado sea 200
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users/${userId}/restore`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBeNull();
  
    // Simula una respuesta exitosa con código de estado 200
    req.flush({}, { status: 200, statusText: 'OK' });
  });
  

  it('should handle error while getting all users', () => {
    service.getUsers().subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Error fetching users' }, { status: 500, statusText: 'Internal Server Error' });
  });
  
  it('should handle error while getting the current user (my user)', () => {
    service.getMyUser().subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/user`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Error fetching user' }, { status: 404, statusText: 'Not Found' });
  });
  
  it('should handle error while getting a single user by ID', () => {
    const userId = 1;
  
    service.getUser(userId).subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Error fetching user' }, { status: 500, statusText: 'Internal Server Error' });
  });
  
  it('should handle error while getting deleted users', () => {
    service.getDeletedUsers().subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Error fetching deleted users' }, { status: 500, statusText: 'Internal Server Error' });
  });
  
  it('should handle error while creating a user', () => {
    const newUser = new UserModel(1, 'John', 'Doe', 'john.doe@example.com', 1, 'admin', '', '');
  
    service.createUser(newUser).subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Error creating user' }, { status: 400, statusText: 'Bad Request' });
  });
  
  it('should handle error while updating a user', () => {
    const updatedUser = new UserModel(1, 'John', 'Doe', 'john.doe@example.com', 1, 'admin', '', '');
  
    service.updateUser(updatedUser).subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users/${updatedUser.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({ message: 'Error updating user' }, { status: 400, statusText: 'Bad Request' });
  });
  
  it('should handle error while deleting a user by ID', () => {
    const userId = 1;
  
    service.deleteUser(userId).subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Error deleting user' }, { status: 500, statusText: 'Internal Server Error' });
  });
  
  it('should handle error while disabling two-factor authentication for a user', () => {
    const userId = 1;
  
    service.disableToFactor(userId).subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users/${userId}/disable-two-factor`);
    expect(req.request.method).toBe('PUT');
    req.flush({ message: 'Error disabling two-factor' }, { status: 500, statusText: 'Internal Server Error' });
  });
  
  it('should handle error while restoring a user by ID', () => {
    const userId = 1;
  
    service.restoreUser(userId).subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/users/${userId}/restore`);
    expect(req.request.method).toBe('PUT');
    req.flush({ message: 'Error restoring user' }, { status: 500, statusText: 'Internal Server Error' });
  });
  
});
