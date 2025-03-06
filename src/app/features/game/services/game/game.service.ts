import { inject, Injectable } from '@angular/core';
import { HttpDataService } from '../http-data/http-data.service';
import { DEFAULT_PUZZLE_INDEX, TOTAL_LEVELS } from '../../consts/default-values.const';
import { combineLatest, map, switchMap, tap } from 'rxjs';
import { GameStateService } from '@features/game/store/game-state/game-state.service';

@Injectable()
export class GameService {
  private readonly httpDataService = inject(HttpDataService);
  private readonly gameState = inject(GameStateService);

  public readonly state$ = this.gameState.selectState((state) => state);
  private readonly loadedLevel$ = this.gameState
    .selectState((state) => state.levelNumber)
    .pipe(switchMap((levelNumber) => this.httpDataService.getLevel(levelNumber)));

  private readonly puzzles$ = this.loadedLevel$.pipe(
    map((level) => level.puzzles),
    tap((puzzles) => {
      this.gameState.updateState({ totalPuzzles: puzzles.length });
    }),
  );

  public readonly puzzle$ = combineLatest([
    this.puzzles$,
    this.gameState.selectState((state) => state.puzzleIndex),
  ]).pipe(map(([puzzles, puzzleIndex]) => puzzles[puzzleIndex]));

  public setPuzzleIndex(puzzleIndex: number): void {
    this.gameState.updateState({ puzzleIndex });
  }

  public setLevelNumber(levelNumber: number): void {
    this.gameState.updateState({ levelNumber });
  }

  public nextPuzzle(): void {
    const { puzzleIndex, totalPuzzles } = this.gameState.currentState;
    if (puzzleIndex === totalPuzzles - 1) {
      this.nextLevel();
      return;
    }
    this.gameState.updateState({ puzzleIndex: puzzleIndex + 1 });
  }

  public nextLevel(): void {
    const { levelNumber } = this.gameState.currentState;
    if (levelNumber === TOTAL_LEVELS) {
      return;
    }

    this.gameState.updateState({
      puzzleIndex: DEFAULT_PUZZLE_INDEX,
      levelNumber: levelNumber + 1,
    });
  }
}
