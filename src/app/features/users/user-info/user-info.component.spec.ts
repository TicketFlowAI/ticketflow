import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfoComponent } from './user-info.component';
import { UserModel } from '../../../core/models/entities/user.model';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../transloco-loader';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoComponent],
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
          loader: TranslocoHttpLoader
        }),
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } }, // Mock para MatDialogRef
        { 
          provide: MAT_DIALOG_DATA, 
          useValue: new UserModel(1, 'John', 'Doe', 'john.doe@example.com', 1, 'Admin', 'Test Company') 
        }, // Mock para MAT_DIALOG_DATA
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user data from MAT_DIALOG_DATA', () => {
    const user = component.user;
    expect(user.id).toBe(1);
    expect(user.name).toBe('John');
    expect(user.lastname).toBe('Doe');
    expect(user.email).toBe('john.doe@example.com');
    expect(user.company_id).toBe(1);
    expect(user.role).toBe('Admin');
    expect(user.company_name).toBe('Test Company');
  });

  it('should close the dialog on return click', () => {
    component.onReturnClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
