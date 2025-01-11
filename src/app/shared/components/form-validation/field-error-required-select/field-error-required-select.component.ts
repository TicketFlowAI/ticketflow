import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'field-error-required-select',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatError
  ],
  templateUrl: './field-error-required-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldErrorRequiredSelectComponent {

}
