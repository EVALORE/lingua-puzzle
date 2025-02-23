import { inject, Injectable } from '@angular/core';
import { HttpDataService } from '../http-data/http-data.service';
import {
  DEFAULT_LEVEL,
  DEFAULT_ROUND_INDEX,
  TOTAL_LEVELS,
} from '../../consts/default_values.const';
import { BehaviorSubject, combineLatest, map, switchMap, tap } from 'rxjs';
import { LocalStorageService } from '../../../core/storage/local-storage/local-storage.service';

@Injectable()
export class PuzzleService {
  private readonly httpDataService = inject(HttpDataService);
  private readonly localStorage = inject(LocalStorageService);

  private readonly gameState = this.localStorage.getItem('game', {
    puzzle: DEFAULT_ROUND_INDEX,
    level: DEFAULT_LEVEL,
    sentenceIndex: 0,
  });

  private readonly currentLevel$ = new BehaviorSubject(this.gameState.level);
  private readonly currentPuzzle$ = new BehaviorSubject(this.gameState.puzzle);
  private readonly totalPuzzles$ = new BehaviorSubject(0);

  public readonly puzzles$ = this.currentLevel$.pipe(
    switchMap((levelNumber) =>
      this.httpDataService.getLevel(levelNumber).pipe(map((level) => level.puzzles)),
    ),
  );

  public readonly puzzle$ = combineLatest([this.puzzles$, this.currentPuzzle$]).pipe(
    map(([puzzles, puzzleIndex]) => puzzles[puzzleIndex]),
  );

  public readonly puzzleData$ = combineLatest({
    totalPuzzles: this.totalPuzzles$,
    puzzle: this.currentPuzzle$,
    level: this.currentLevel$,
  }).pipe(
    map((data) => ({
      ...data,
      totalLevels: TOTAL_LEVELS,
    })),
    tap((data) => {
      this.updateGameStateInLocalStorage(data.puzzle, data.level);
    }),
  );

  private updateGameStateInLocalStorage(round: number, level: number): void {
    this.localStorage.setItem('game', { level, puzzle: round, sentenceIndex: 0 });
  }

  public setRoundIndex(roundIndex: number): void {
    this.currentPuzzle$.next(roundIndex);
  }

  public setLevelNumber(levelNumber: number): void {
    this.currentLevel$.next(levelNumber);
  }

  public nextRound(): void {
    if (this.isLastRound()) {
      this.nextLevel();
      return;
    }
    this.setRoundIndex(this.currentPuzzle$.value + 1);
  }

  public nextLevel(): void {
    if (this.isLastLevel()) {
      return;
    }
    this.setRoundIndex(DEFAULT_ROUND_INDEX);
    this.setLevelNumber(this.currentLevel$.value + 1);
  }

  private isLastLevel(): boolean {
    return this.currentLevel$.value === TOTAL_LEVELS;
  }

  private isLastRound(): boolean {
    return this.currentPuzzle$.value === this.totalPuzzles$.value - 1;
  }
}
