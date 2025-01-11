import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'field-error-text',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatError
  ],
  templateUrl: './field-error-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldErrorTextComponent {

}
