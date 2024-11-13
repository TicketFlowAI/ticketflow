import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketInfoComponent } from './ticket-info.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../../transloco-loader';

describe('TicketInfoComponent', () => {
  let component: TicketInfoComponent;
  let fixture: ComponentFixture<TicketInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketInfoComponent],
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
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } }, // Mock de MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: { id: 1, title: 'Test Ticket', priority: 2 } }, // Mock de MAT_DIALOG_DATA
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketInfoComponent);
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
});
