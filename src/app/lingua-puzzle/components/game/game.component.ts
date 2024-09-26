import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MatButton } from '@angular/material/button';
import { HintsComponent } from '../hints/hints.component';
import { PuzzleComponent } from '../puzzle/puzzle.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatButton, HintsComponent, PuzzleComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  private readonly gameService = inject(GameService);
  protected isSourceEmpty = computed(() => this.gameService.source().length === 0);
  protected isWin = this.gameService.isWin;

  protected startResultAutoComplete(): void {
    this.gameService.sortCardsInCorrectOrder();
  }

  protected nextSentence(): void {}

  protected startCardsChecking(): void {
    this.gameService.checkCards();
  }
}
