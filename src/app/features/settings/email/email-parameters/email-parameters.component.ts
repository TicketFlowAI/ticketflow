import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-email-parameters',
  standalone: true,
  imports: [
    TranslocoDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './email-parameters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailParametersComponent {
  public readonly dialogRef = inject(MatDialogRef<EmailParametersComponent>);
  private cdr = inject(ChangeDetectorRef)
  private translocoService = inject(TranslocoService)
  parameterObjects: ParameterObject[] = []

  ngOnInit() {
    this.loadParameters()
  }

  loadParameters() {
    const emailParameter1: ParameterObject = new ParameterObject('$serviceData[\'company\']', this.translocoService.translateObject('FEATURES.SETTINGS.EMAIL-SETTINGS.PARAMETER1'))
    const emailParameter2: ParameterObject = new ParameterObject('$serviceData[\'serviceName\']', this.translocoService.translateObject('FEATURES.SETTINGS.EMAIL-SETTINGS.PARAMETER2'))
    const emailParameter3: ParameterObject = new ParameterObject('$serviceData[\'endDate\']', this.translocoService.translateObject('FEATURES.SETTINGS.EMAIL-SETTINGS.PARAMETER3'))
    const emailParameter4: ParameterObject = new ParameterObject('{service}', this.translocoService.translateObject('FEATURES.SETTINGS.EMAIL-SETTINGS.PARAMETER4'))
    const emailParameter5: ParameterObject = new ParameterObject('{days}', this.translocoService.translateObject('FEATURES.SETTINGS.EMAIL-SETTINGS.PARAMETER5'))

    this.parameterObjects.push(emailParameter1)
    this.parameterObjects.push(emailParameter2)
    this.parameterObjects.push(emailParameter3)
    this.parameterObjects.push(emailParameter4)
    this.parameterObjects.push(emailParameter5)

    this.cdr.markForCheck()
  }

  onReturnClick(): void {
    this.dialogRef.close();
  }
}

class ParameterObject {
  constructor(
    public parameter: string = '',
    public description: string = ''
  ) {
  }
}
