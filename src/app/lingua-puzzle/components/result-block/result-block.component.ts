import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-result-block',
  standalone: true,
  imports: [MatCard],
  templateUrl: './result-block.component.html',
  styleUrl: './result-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultBlockComponent {
  private readonly gameService = inject(GameService);
  protected result = this.gameService.result;

  public onWordClick($index: number): void {
    this.gameService.moveToSource($index);
  }
}
