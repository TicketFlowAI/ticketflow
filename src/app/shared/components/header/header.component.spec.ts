import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { UserManagementService } from '../../../core/services/user-management.service';
import { AuthManagementService } from '../../../core/services/auth-management.service';
import { ThemeService } from '../../../core/services/theme.service';
import { TranslocoService } from '@jsverse/transloco';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserModel, UserRoles } from '../../../core/models/entities/user.model';
import { getTranslocoModule } from '../../../transloco-testing.module';

const userMock = new UserModel( 1, 'Mr', 'NoBody', 'example@gmail.com', 1, UserRoles.Technician, 'SomeCompany');
   
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userManagementServiceMock: jasmine.SpyObj<UserManagementService>;
  let authManagementServiceMock: jasmine.SpyObj<AuthManagementService>;
  let themeServiceMock: jasmine.SpyObj<ThemeService>;
  let translocoServiceMock: jasmine.SpyObj<TranslocoService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userManagementServiceMock = jasmine.createSpyObj('UserManagementService', ['currentUser', 'isUserAdmin', 'isUserTechnician', 'isUserClient']);
    authManagementServiceMock = jasmine.createSpyObj('AuthManagementService', ['logout']);
    themeServiceMock = jasmine.createSpyObj('ThemeService', ['setStartTheme', 'toggleTheme']);
    translocoServiceMock = jasmine.createSpyObj('TranslocoService', ['setActiveLang']);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

     userManagementServiceMock.currentUser.and.returnValue(userMock);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, getTranslocoModule()],
      providers: [
        { provide: UserManagementService, useValue: userManagementServiceMock },
        { provide: AuthManagementService, useValue: authManagementServiceMock },
        { provide: ThemeService, useValue: themeServiceMock },
        { provide: TranslocoService, useValue: translocoServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentUser on initialization', () => {
    expect(component.currentUser).toEqual(userMock);
  });

  it('should set the start theme on initialization', () => {
    expect(themeServiceMock.setStartTheme).toHaveBeenCalled();
  });

  it('should switch language when switchLanguage is called', () => {
    component.switchLanguage('en');
    expect(translocoServiceMock.setActiveLang).toHaveBeenCalledWith('en');
  });

  it('should toggle the theme when toggleTheme is called', () => {
    component.toggleTheme();
    expect(themeServiceMock.toggleTheme).toHaveBeenCalled();
  });

  it('should call logout and navigate to root when logout is called', () => {
    component.logout();
    expect(authManagementServiceMock.logout).toHaveBeenCalled();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
