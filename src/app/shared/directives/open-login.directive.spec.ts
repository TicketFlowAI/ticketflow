import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OpenLoginDirective } from './open-login.directive';
import { DialogManagerService } from '../../core/services/dialog-manager.service';

describe('OpenLoginDirective', () => {
  let openLoginDialogSpy: jasmine.Spy;

  @Component({
    template: `<button OpenLogin>Login</button>`, // Componente de prueba con la directiva aplicada
  })
  class TestComponent {}

  beforeEach(() => {
    const dialogManagerServiceMock = {
      openLoginDialog: jasmine.createSpy('openLoginDialog'),
    };

    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [
        { provide: DialogManagerService, useValue: dialogManagerServiceMock },
      ],
      imports: [OpenLoginDirective],
    });

    openLoginDialogSpy = TestBed.inject(DialogManagerService)
      .openLoginDialog as jasmine.Spy;
  });

  it('should call openLoginDialog when the element is clicked', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.directive(OpenLoginDirective));

    buttonElement.triggerEventHandler('click', new Event('click'));

    expect(openLoginDialogSpy).toHaveBeenCalled();
  });
});
