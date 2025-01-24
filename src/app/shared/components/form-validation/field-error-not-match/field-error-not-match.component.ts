import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'field-error-not-match',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatError
  ],
  templateUrl: './field-error-not-match.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldErrorNotMatchComponent {

}
