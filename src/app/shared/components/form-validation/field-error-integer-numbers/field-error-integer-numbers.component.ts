import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'field-error-integer-numbers',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatError
  ],
  templateUrl: './field-error-integer-numbers.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class FieldErrorIntegerNumbersComponent {

}
