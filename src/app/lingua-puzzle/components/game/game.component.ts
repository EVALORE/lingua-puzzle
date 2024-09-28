import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { HintsComponent } from '../hints/hints.component';
import { PuzzleComponent } from '../puzzle/puzzle.component';
import { PuzzleService } from '../../services/puzzle/puzzle.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatButton, HintsComponent, PuzzleComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  private readonly puzzleService = inject(PuzzleService);
  protected isSourceEmpty = this.puzzleService.isSourceEmpty;
  protected isWin = this.puzzleService.arePositionsCorrect;

  protected startResultAutoComplete(): void {
    this.puzzleService.sortCardsByOriginalIndex();
  }

  protected nextSentence(): void {
    this.puzzleService.nextSentence()
  }

  protected checkResultCorrectness(): void {
    this.puzzleService.updateCardsPositionStatus();
  }
}
