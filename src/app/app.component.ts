import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./shared/components/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer.component";
import { AuthService } from './core/services/auth.service';
import { CustomToastComponent } from "./shared/components/custom-toast/custom-toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CustomToastComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private readonly authService = inject(AuthService)
  title = 'Ticketflow';

  constructor() {
      this.authService.authenticate();
  }
}
