import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameService } from './services/game/game.service';
import { HttpDataService } from './services/http-data/http-data.service';
import { CardService } from './services/card/card.service';
import { GameComponent } from './components/game/game.component';
import { PuzzleService } from './services/puzzle/puzzle.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { LevelRoundDropdownComponent } from './components/level-round-dropdown/level-round-dropdown.component';

@Component({
  selector: 'app-puzzle',
  imports: [GameComponent, ReactiveFormsModule, AsyncPipe, LevelRoundDropdownComponent],
  templateUrl: './puzzle.component.html',
  providers: [GameService, HttpDataService, CardService, PuzzleService],
  styleUrl: './puzzle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PuzzleComponent {
  private readonly puzzleService = inject(PuzzleService);

  protected readonly gameState$ = this.puzzleService.gameState$;
  protected round$ = this.puzzleService.puzzle$;

  protected nextRound(): void {
    this.puzzleService.nextPuzzle();
  }

  protected levelChange(level: number): void {
    this.puzzleService.setLevelNumber(level);
  }

  protected roundChange(round: number): void {
    this.puzzleService.setPuzzleIndex(round);
  }
}
