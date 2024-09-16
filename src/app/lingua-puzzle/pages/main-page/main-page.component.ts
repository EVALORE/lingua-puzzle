import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MatCard],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  private readonly gameService = inject(GameService);
  protected source = this.gameService.source;
  protected result = this.gameService.result;

  public onWordClick($index: number, target: 'source' | 'result'): void {
    if (target === 'source') {
      this.gameService.moveToSource($index);
    }
    if (target === 'result') {
      this.gameService.moveToResult($index);
    }
  }
}
