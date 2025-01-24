import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageSurveyQuestionComponent } from './manage-survey-question.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('ManageSurveyQuestionComponent', () => {
  let component: ManageSurveyQuestionComponent;
  let fixture: ComponentFixture<ManageSurveyQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSurveyQuestionComponent], // Declaración del componente
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
            close: jasmine.createSpy('close'), // Mock del método close
            backdropClick: jasmine.createSpy('backdropClick').and.returnValue(of(new MouseEvent('click'))), // Mock del método backdropClick
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            question: 'Test question',
            status: 1, // Datos simulados del diálogo
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageSurveyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta los cambios iniciales en el componente
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with data from MAT_DIALOG_DATA', () => {
    expect(component.surveyQuestionForm.value).toEqual({
      question: 'Test question',
      active: true, // Datos del formulario inicializados desde MAT_DIALOG_DATA
    });
  });

  it('should call dialogRef.close with true on save click when adding a question', () => {
    const surveyManagementServiceSpy = jasmine.createSpyObj('SurveyManagementService', ['addSurveyQuestion']);
    surveyManagementServiceSpy.addSurveyQuestion.and.returnValue(of({})); // Mock del método addSurveyQuestion
    (component as any).surveyManagementService = surveyManagementServiceSpy;

    component.surveyQuestion = null; // Simula agregar una nueva pregunta
    component.onSaveClick();

    expect(surveyManagementServiceSpy.addSurveyQuestion).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should call dialogRef.close with true on save click when editing a question', () => {
    const surveyManagementServiceSpy = jasmine.createSpyObj('SurveyManagementService', ['editSurveyQuestion']);
    surveyManagementServiceSpy.editSurveyQuestion.and.returnValue(of({})); // Mock del método editSurveyQuestion
    (component as any).surveyManagementService = surveyManagementServiceSpy;

    component.surveyQuestion = { id: 1, question: 'Test question', status: 1 } as any; // Simula edición de una pregunta
    component.onSaveClick();

    expect(surveyManagementServiceSpy.editSurveyQuestion).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should call dialogRef.close with false on backdrop click', () => {
    component.dialogRef.backdropClick().subscribe(() => {
      expect(component.dialogRef.close).toHaveBeenCalledWith(false);
    });

    component.ngOnInit(); // Llama a ngOnInit para iniciar la suscripción
  });
});
