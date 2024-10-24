import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllUsersComponent {

}
