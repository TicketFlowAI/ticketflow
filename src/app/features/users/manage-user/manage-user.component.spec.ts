import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageUserComponent } from './manage-user.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../transloco-loader';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from '../../../core/models/entities/user.model';
import { of } from 'rxjs';

describe('ManageUserComponent', () => {
  let component: ManageUserComponent;
  let fixture: ComponentFixture<ManageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageUserComponent],
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
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close'),
            backdropClick: jasmine.createSpy('backdropClick').and.returnValue(of()), // Mock añadido
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: new UserModel(1, 'John', 'Doe', 'johndoe@example.com', 2, 'technician', 'Example Company')
        }, // Mock de MAT_DIALOG_DATA
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls with data from MAT_DIALOG_DATA', () => {
    expect(component.nameFormControl.value).toBe('John');
    expect(component.lastnameFormControl.value).toBe('Doe');
    expect(component.emailFormControl.value).toBe('johndoe@example.com');
    expect(component.companyFormControl.value).toBe(2);
  });
});
