import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCompanyComponent {

}
