import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ScrollToTopInstantDirective } from './scroll-to-top-instant.directive';

describe('ScrollToTopInstantDirective', () => {
  @Component({
    template: `<button ScrollToTopInstant>Scroll to Top</button>`,
  })
  class TestComponent {}

  let scrollToSpy: jasmine.Spy;

  beforeEach(() => {
    scrollToSpy = spyOn(window, 'scrollTo'); 
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ScrollToTopInstantDirective],
    });
  });

  it('should scroll to the top when clicked', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.directive(ScrollToTopInstantDirective));

    buttonElement.triggerEventHandler('click', new Event('click'));

    expect(scrollToSpy).toHaveBeenCalledWith({ top: -50, behavior: 'instant' });
  });
});
