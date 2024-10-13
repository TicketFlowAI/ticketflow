import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MatDialogRef } from '@angular/material/dialog';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideTransloco} from "@jsverse/transloco";
import {isDevMode} from "@angular/core";
import {TranslocoHttpLoader} from "../../../transloco-loader";

// Mock para MatDialogRef
const mockDialogRef = {
  close: jasmine.createSpy('close'), // Simula el método close()
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
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
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close on MatDialogRef', () => {
    component.closeDialog(); // Suponiendo que tengas un método en tu componente que cierre el diálogo
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
