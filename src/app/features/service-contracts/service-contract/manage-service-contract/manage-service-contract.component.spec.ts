import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageServiceContractComponent } from './manage-service-contract.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { of } from 'rxjs';

describe('ManageServiceContractComponent', () => {
  let component: ManageServiceContractComponent;
  let fixture: ComponentFixture<ManageServiceContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ManageServiceContractComponent, // Componente standalone
        MatDialogModule, // Asegúrate de incluir este si `MatDialog` se utiliza
        ReactiveFormsModule, // Para los formularios
        MatFormFieldModule, // Para los campos de formulario
        MatSelectModule, // Para los selects
      ],
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
            backdropClick: jasmine.createSpy('backdropClick').and.returnValue(of()), // Mock de backdropClick
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            serviceContract: { id: 1, company_id: 1, service_id: 3, service_term_id: 4 },
            companyId: 1,
          },
        }, // Mock de MAT_DIALOG_DATA
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageServiceContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with data from MAT_DIALOG_DATA', () => {
    expect(component.companyFormControl.value).toBe(1);
    expect(component.serviceFormControl.value).toBe(3);
    expect(component.serviceContactTermFormControl.value).toBe(4);
  });
});
