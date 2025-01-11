import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'field-error-decimal-numbers',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatError
  ],
  templateUrl: './field-error-decimal-numbers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldErrorDecimalNumbersComponent {

}
