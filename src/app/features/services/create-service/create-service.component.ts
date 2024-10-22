import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-create-service',
  standalone: true,
  imports: [],
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateServiceComponent {

}
