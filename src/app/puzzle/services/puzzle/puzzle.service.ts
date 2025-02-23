import { inject, Injectable } from '@angular/core';
import { HttpDataService } from '../http-data/http-data.service';
import {
  DEFAULT_LEVEL,
  DEFAULT_PUZZLE_INDEX,
  TOTAL_LEVELS,
} from '../../consts/default_values.const';
import { BehaviorSubject, combineLatest, map, switchMap, tap } from 'rxjs';
import { LocalStorageService } from '../../../core/storage/local-storage/local-storage.service';

@Injectable()
export class PuzzleService {
  private readonly httpDataService = inject(HttpDataService);
  private readonly localStorage = inject(LocalStorageService);

  private readonly gameState = this.localStorage.getItem('game', {
    puzzleIndex: DEFAULT_PUZZLE_INDEX,
    levelNumber: DEFAULT_LEVEL,
    sentenceIndex: 0,
  });

  private readonly levelNumber$ = new BehaviorSubject(this.gameState.levelNumber);
  private readonly puzzleIndex$ = new BehaviorSubject(this.gameState.puzzleIndex);
  private readonly totalPuzzles$ = new BehaviorSubject(0);

  public readonly puzzleData$ = combineLatest({
    totalPuzzles: this.totalPuzzles$,
    puzzleIndex: this.puzzleIndex$,
    levelNumber: this.levelNumber$,
  }).pipe(
    map((data) => ({
      ...data,
      totalLevels: TOTAL_LEVELS,
    })),
    tap((data) => {
      this.updateGameStateInLocalStorage(data.puzzleIndex, data.levelNumber);
    }),
  );

  public readonly puzzles$ = this.levelNumber$.pipe(
    switchMap((levelNumber) =>
      this.httpDataService.getLevel(levelNumber).pipe(
        map((level) => level.puzzles),
        tap((puzzles) => {
          this.totalPuzzles$.next(puzzles.length);
        }),
      ),
    ),
  );

  public readonly puzzle$ = combineLatest([this.puzzles$, this.puzzleIndex$]).pipe(
    map(([puzzles, puzzleIndex]) => puzzles[puzzleIndex]),
  );

  private updateGameStateInLocalStorage(puzzleIndex: number, levelNumber: number): void {
    this.localStorage.setItem('game', { levelNumber, puzzleIndex, sentenceIndex: 0 });
  }

  public setPuzzleIndex(puzzleIndex: number): void {
    this.puzzleIndex$.next(puzzleIndex);
  }

  public setLevelNumber(levelNumber: number): void {
    this.levelNumber$.next(levelNumber);
  }

  public nextPuzzle(): void {
    if (this.isLastPuzzle()) {
      this.nextLevel();
      return;
    }
    this.setPuzzleIndex(this.puzzleIndex$.value + 1);
  }

  public nextLevel(): void {
    if (this.isLastLevel()) {
      return;
    }
    this.setPuzzleIndex(DEFAULT_PUZZLE_INDEX);
    this.setLevelNumber(this.levelNumber$.value + 1);
  }

  private isLastLevel(): boolean {
    return this.levelNumber$.value === TOTAL_LEVELS;
  }

  private isLastPuzzle(): boolean {
    return this.puzzleIndex$.value === this.totalPuzzles$.value - 1;
  }
}
