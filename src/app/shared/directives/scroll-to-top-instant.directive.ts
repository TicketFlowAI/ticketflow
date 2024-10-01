import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[ScrollToTopInstant]',
  standalone: true
})
export class ScrollToTopInstantDirective {
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault()
    window.scrollTo({top: -50, behavior: 'instant'})
  }
}
