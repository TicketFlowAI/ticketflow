import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'field-error-required',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatError
  ],
  templateUrl: './field-error-required.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class FieldErrorRequiredComponent {

}
