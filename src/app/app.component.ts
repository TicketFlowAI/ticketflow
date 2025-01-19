import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { AuthManagementService } from './core/services/auth-management.service';
import { CustomToastComponent } from "./shared/components/custom-toast/custom-toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CustomToastComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly authManagementService = inject(AuthManagementService)
  title = 'Ticketflow';

  constructor() {
    this.authManagementService.authenticate();
  }
}
