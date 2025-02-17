import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { LocalStorageService } from '../core/storage/local-storage/local-storage.service';
import { combineLatest, map, tap } from 'rxjs';

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
  private readonly localStorage = inject(LocalStorageService);
  protected round$ = this.puzzleService.round$;

  protected readonly levelRoundData$ = combineLatest({
    round: this.puzzleService.roundIndex$,
    level: this.puzzleService.levelNumber$,
    roundsCount: this.puzzleService.roundsCount$,
  }).pipe(
    map((data) => ({
      ...data,
      levelCount: TOTAL_LEVELS,
    })),
    tap((data) => {
      this.updateGameStateInLocalStorage(data.round, data.level);
    }),
  );

  constructor() {
    this.updateCurrent();
  }

  private updateGameStateInLocalStorage(round: number, level: number): void {
    this.localStorage.setItem('game', { level, round, sentenceIndex: 0 });
  }

  private updateCurrent(): void {
    const defaultValue = {
      round: DEFAULT_ROUND_INDEX,
      level: DEFAULT_LEVEL,
      sentenceIndex: 0,
    };
    const { level, round } = this.localStorage.getItem('game', defaultValue);
    this.roundChange(round);
    this.levelChange(level);
  }

  protected nextRound(): void {
    this.puzzleService.nextRound();
  }

  protected levelChange(level: number): void {
    this.puzzleService.setLevelNumber(level);
  }

  protected roundChange(round: number): void {
    this.puzzleService.setRoundIndex(round);
  }
}
