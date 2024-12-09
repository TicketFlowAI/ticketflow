import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmailTemplateComponent } from './manage-email-template.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../../transloco-loader';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailTemplateModel } from '../../../../../core/models/entities/email-template.model';

describe('ManageEmailTemplateComponent', () => {
  let component: ManageEmailTemplateComponent;
  let fixture: ComponentFixture<ManageEmailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEmailTemplateComponent],
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
          useValue: new EmailTemplateModel(1, 'Template Exmaple', '<html><html/>'),
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
