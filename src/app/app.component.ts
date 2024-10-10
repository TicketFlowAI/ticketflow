import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./shared/components/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer.component";
import { UserSesionService } from './core/services/user-sesion.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  userSessionService = inject(UserSesionService)
  title = 'TicketFlow';

  constructor() {
    this.userSessionService.checkUserInitialState();
  }
}
