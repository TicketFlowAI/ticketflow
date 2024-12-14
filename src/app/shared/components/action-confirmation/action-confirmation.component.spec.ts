import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionConfirmationComponent } from './action-confirmation.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { getTranslocoModule } from '../../../transloco-testing.module';

describe('ActionConfirmationComponent', () => {
  let component: ActionConfirmationComponent;
  let fixture: ComponentFixture<ActionConfirmationComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ActionConfirmationComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ActionConfirmationComponent,
        getTranslocoModule(),
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy }, 
        { provide: MAT_DIALOG_DATA, useValue: 'Are you sure?' }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Inicializa el DOM
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the injected data as the dialog title', () => {
    const titleElement = fixture.debugElement.query(By.css('h2.title'));
    expect(titleElement.nativeElement.textContent.trim()).toBe('Are you sure?');
  });

  it('should call dialogRef.close(false) when "Cancel" button is clicked', () => {
    const cancelButton = fixture.debugElement.query(By.css('button.btn-danger'));
    cancelButton.triggerEventHandler('click', {});
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('should call dialogRef.close(true) when "OK" button is clicked', () => {
    const okButton = fixture.debugElement.query(By.css('button.btn-success'));
    okButton.triggerEventHandler('click', {});
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  }); 
});
