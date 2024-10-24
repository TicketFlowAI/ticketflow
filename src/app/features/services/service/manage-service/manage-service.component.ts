import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-manage-service',
  standalone: true,
  imports: [],
  templateUrl: './manage-service.component.html',
  styleUrl: './manage-service.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageServiceComponent {

}
