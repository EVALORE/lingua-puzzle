import { inject, Injectable } from '@angular/core';
import { HttpDataService } from '../http-data/http-data.service';
import {
  DEFAULT_LEVEL,
  DEFAULT_PUZZLE_INDEX,
  TOTAL_LEVELS,
} from '../../consts/default-values.const';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { LocalStorageService } from '../../../core/storage/local-storage/local-storage.service';

interface GameState {
  puzzleIndex: number;
  levelNumber: number;
  sentenceIndex: number;
  totalPuzzles: number;
  totalLevels: number;
}

@Injectable()
export class PuzzleService {
  private readonly httpDataService = inject(HttpDataService);
  private readonly localStorage = inject(LocalStorageService);

  public readonly gameState$ = new BehaviorSubject<GameState>({
    ...this.localStorage.getItem('game', {
      puzzleIndex: DEFAULT_PUZZLE_INDEX,
      levelNumber: DEFAULT_LEVEL,
      sentenceIndex: 0,
    }),
    totalPuzzles: 0,
    totalLevels: TOTAL_LEVELS,
  });

  private readonly loadedLevel$ = this.selectState((state) => state.levelNumber).pipe(
    switchMap((levelNumber) => this.httpDataService.getLevel(levelNumber)),
  );

  private readonly puzzles$ = this.loadedLevel$.pipe(
    map((level) => level.puzzles),
    tap((puzzles) => {
      this.updateState({ totalPuzzles: puzzles.length });
    }),
  );

  public readonly puzzle$ = combineLatest([
    this.puzzles$,
    this.selectState((state) => state.puzzleIndex),
  ]).pipe(map(([puzzles, puzzleIndex]) => puzzles[puzzleIndex]));

  private updateState(partialState: Partial<GameState>): void {
    const newState = {
      ...this.gameState$.value,
      ...partialState,
    };
    this.gameState$.next(newState);

    this.localStorage.setItem('game', {
      puzzleIndex: newState.puzzleIndex,
      levelNumber: newState.levelNumber,
      sentenceIndex: newState.sentenceIndex,
    });
  }

  public setPuzzleIndex(puzzleIndex: number): void {
    this.updateState({ puzzleIndex });
  }

  public setLevelNumber(levelNumber: number): void {
    this.updateState({ levelNumber });
  }

  public nextPuzzle(): void {
    const { puzzleIndex, totalPuzzles } = this.gameState$.value;
    if (puzzleIndex === totalPuzzles - 1) {
      this.nextLevel();
      return;
    }
    this.updateState({ puzzleIndex: puzzleIndex + 1 });
  }

  public nextLevel(): void {
    const { levelNumber } = this.gameState$.value;
    if (levelNumber === TOTAL_LEVELS) {
      return;
    }

    this.updateState({
      puzzleIndex: DEFAULT_PUZZLE_INDEX,
      levelNumber: levelNumber + 1,
    });
  }

  private selectState<T>(selector: (state: GameState) => T): Observable<T> {
    return this.gameState$.pipe(map(selector), distinctUntilChanged());
  }
}
