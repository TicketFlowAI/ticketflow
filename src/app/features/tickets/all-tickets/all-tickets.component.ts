import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-all-tickets',
  standalone: true,
  imports: [],
  templateUrl: './all-tickets.component.html',
  styleUrl: './all-tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTicketsComponent {

}
