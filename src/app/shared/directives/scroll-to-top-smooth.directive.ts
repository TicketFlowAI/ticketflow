import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[ScrollToTopSmooth]',
  standalone: true
})
export class ScrollToTopSmoothDirective {
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault()
    window.scrollTo({top: -50, behavior: "smooth"})
  }
}
