import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceInfoComponent } from './service-info.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceModel } from '../../../../core/models/entities/service.model';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../../transloco-loader';

describe('ServiceInfoComponent', () => {
  let component: ServiceInfoComponent;
  let fixture: ComponentFixture<ServiceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceInfoComponent],
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
          useValue: { close: jasmine.createSpy('close') },
        }, // Mock para MatDialogRef
        {
          provide: MAT_DIALOG_DATA,
          useValue: new ServiceModel(
            1, // id
            'Test Service', // description
            'Test Details', // details <-- Agregado aquí
            2, // category_id
            3, // tax_id
            100, // price
            'Test Category', // category
            'Test Tax', // tax_description
          ),
        }, // Mock completo para MAT_DIALOG_DATA
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog on return click', () => {
    component.onReturnClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should initialize service data from MAT_DIALOG_DATA', () => {
    expect(component.service.id).toBe(1);
    expect(component.service.description).toBe('Test Service');
    expect(component.service.details).toBe('Test Details'); // Verifica el nuevo campo
    expect(component.service.category_id).toBe(2);
    expect(component.service.tax_id).toBe(3);
    expect(component.service.price).toBe(100);
    expect(component.service.category).toBe('Test Category');
    expect(component.service.tax_description).toBe('Test Tax');
  });
});
