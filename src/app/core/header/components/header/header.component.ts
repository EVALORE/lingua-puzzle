import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
