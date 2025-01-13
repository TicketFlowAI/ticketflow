import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new-service-request',
  standalone: true,
  imports: [],
  templateUrl: './new-service-request.component.html',
  styleUrl: './new-service-request.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewServiceRequestComponent {

}
