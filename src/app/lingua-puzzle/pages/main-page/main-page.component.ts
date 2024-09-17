import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameComponent } from '../../components/game/game.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [GameComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {}
