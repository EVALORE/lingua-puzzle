import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { MatToolbar } from '@angular/material/toolbar';
import { AuthService } from '../../../../auth/services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserComponent, MatToolbar, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly isUser$ = inject(AuthService).isUser$;
}
