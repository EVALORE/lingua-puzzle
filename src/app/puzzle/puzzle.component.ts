import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GameService } from './services/game/game.service';
import { RoundService } from './services/round/round.service';
import { HttpDataService } from './services/http-data/http-data.service';
import { LevelService } from './services/level/level.service';
import { CardService } from './services/card/card.service';
import { GameComponent } from './components/game/game.component';
import { PuzzleService } from './services/puzzle/puzzle.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { LevelRoundDropdownComponent } from './components/level-round-dropdown/level-round-dropdown.component';
import { DEFAULT_LEVEL, DEFAULT_ROUND_INDEX, TOTAL_LEVELS } from './consts/default_values.const';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-puzzle',
  imports: [GameComponent, ReactiveFormsModule, AsyncPipe, LevelRoundDropdownComponent],
  templateUrl: './puzzle.component.html',
  providers: [GameService, LevelService, RoundService, HttpDataService, CardService, PuzzleService],
  styleUrl: './puzzle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PuzzleComponent {
  private readonly puzzleService = inject(PuzzleService);
  protected round$ = this.puzzleService.round$;

  private roundsCount = toSignal(this.puzzleService.roundsCount$, { initialValue: 0 });
  private roundCurrent = toSignal(this.puzzleService.roundIndex$, {
    initialValue: DEFAULT_ROUND_INDEX,
  });
  private levelCurrent = toSignal(this.puzzleService.levelNumber$, { initialValue: DEFAULT_LEVEL });

  protected levels = computed(() => ({
    count: TOTAL_LEVELS,
    current: this.levelCurrent(),
  }));

  protected rounds = computed(() => ({
    count: this.roundsCount(),
    current: this.roundCurrent(),
  }));

  protected nextRound(): void {
    this.puzzleService.nextRound();
  }

  protected onLevelChange(level: number): void {
    this.puzzleService.setLevelNumber(level);
  }

  protected onRoundChange(round: number): void {
    this.puzzleService.setRoundIndex(round);
  }
}
