import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import {
  DEFAULT_LEVEL,
  DEFAULT_PUZZLE_INDEX,
  TOTAL_LEVELS,
} from '@features/game/consts/default-values.const';
import { LocalStorageService } from '@core/storage/local-storage/local-storage.service';

interface GameState {
  puzzleIndex: number;
  levelNumber: number;
  totalPuzzles: number;
  totalLevels: number;
}

@Injectable()
export class GameStateService {
  private readonly localStorage = inject(LocalStorageService);

  private readonly gameState$ = new BehaviorSubject<GameState>({
    ...this.localStorage.getItem('game', {
      puzzleIndex: DEFAULT_PUZZLE_INDEX,
      levelNumber: DEFAULT_LEVEL,
    }),
    totalPuzzles: 0,
    totalLevels: TOTAL_LEVELS,
  });

  public updateState(partialState: Partial<GameState>): void {
    const newState = {
      ...this.gameState$.value,
      ...partialState,
    };

    if ('levelNumber' in partialState) {
      newState.puzzleIndex = DEFAULT_PUZZLE_INDEX;
    }

    this.gameState$.next(newState);

    this.localStorage.setItem('game', {
      puzzleIndex: newState.puzzleIndex,
      levelNumber: newState.levelNumber,
    });
  }

  public get currentState(): GameState {
    return this.gameState$.value;
  }

  public selectState<T>(selector: (state: GameState) => T): Observable<T> {
    return this.gameState$.pipe(map(selector), distinctUntilChanged());
  }
}
