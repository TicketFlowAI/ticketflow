import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TranslocoDirective} from "@jsverse/transloco";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    TranslocoDirective,
  ],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  getYear() {
    return (new Date()).getFullYear().toString();
  }
}
