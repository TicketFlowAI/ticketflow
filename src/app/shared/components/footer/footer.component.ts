import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TranslocoDirective, TranslocoService} from "@jsverse/transloco";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    TranslocoDirective,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {


  getYear() {
    return (new Date()).getFullYear().toString();
  }
}
