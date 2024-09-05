import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButton],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  private readonly authService = inject(AuthService);

  protected onLogout(): void {
    this.authService.logout();
  }
}
