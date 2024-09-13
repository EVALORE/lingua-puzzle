import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-source-block',
  standalone: true,
  imports: [MatCard],
  templateUrl: './source-block.component.html',
  styleUrl: './source-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceBlockComponent {
  private readonly gameService = inject(GameService);
  protected source = this.gameService.source;

  public onWordClick($index: number): void {
    this.gameService.moveToResult($index);
  }
}
