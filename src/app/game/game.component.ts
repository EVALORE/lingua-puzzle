import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PuzzleService } from './services/puzzle/puzzle.service';
import { HttpDataService } from './services/http-data/http-data.service';
import { GameService } from './services/game/game.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { PuzzleSelectorComponent } from './components/puzzle-selector/puzzle-selector.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';

@Component({
  selector: 'app-game',
  imports: [ReactiveFormsModule, AsyncPipe, PuzzleSelectorComponent, PuzzleComponent],
  templateUrl: './game.component.html',
  providers: [PuzzleService, HttpDataService, GameService],
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  private readonly gameService = inject(GameService);

  protected readonly gameState$ = this.gameService.gameState$;
  protected round$ = this.gameService.puzzle$;

  protected nextRound(): void {
    this.gameService.nextPuzzle();
  }

  protected levelChange(level: number): void {
    this.gameService.setLevelNumber(level);
  }

  protected roundChange(round: number): void {
    this.gameService.setPuzzleIndex(round);
  }
}
