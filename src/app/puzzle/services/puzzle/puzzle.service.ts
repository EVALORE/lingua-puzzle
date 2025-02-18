import { inject, Injectable } from '@angular/core';
import { HttpDataService } from '../http-data/http-data.service';
import {
  DEFAULT_LEVEL,
  DEFAULT_ROUND_INDEX,
  TOTAL_LEVELS,
} from '../../consts/default_values.const';
import { BehaviorSubject, combineLatest, map, switchMap, tap } from 'rxjs';

@Injectable()
export class PuzzleService {
  private readonly httpDataService = inject(HttpDataService);

  public readonly levelNumber$ = new BehaviorSubject(DEFAULT_LEVEL);
  public readonly roundIndex$ = new BehaviorSubject(DEFAULT_ROUND_INDEX);
  public readonly roundsCount$ = new BehaviorSubject(0);

  private rounds$ = this.levelNumber$.pipe(
    switchMap((levelNumber) =>
      this.httpDataService.getLevel(levelNumber).pipe(
        tap((level) => {
          this.roundsCount$.next(level.roundsCount);
        }),
        map((level) => level.rounds),
      ),
    ),
  );

  public readonly round$ = combineLatest([this.rounds$, this.roundIndex$]).pipe(
    map(([rounds, roundIndex]) => rounds[roundIndex]),
  );

  public setRoundIndex(roundIndex: number): void {
    this.roundIndex$.next(roundIndex);
  }

  public setLevelNumber(levelNumber: number): void {
    this.levelNumber$.next(levelNumber);
  }

  public nextRound(): void {
    if (this.isLastRound()) {
      this.nextLevel();
      return;
    }
    this.setRoundIndex(this.roundIndex$.value + 1);
  }

  public nextLevel(): void {
    if (this.isLastLevel()) {
      return;
    }
    this.setLevelNumber(this.levelNumber$.value + 1);
  }

  private isLastRound(): boolean {
    return this.roundIndex$.value === this.roundsCount$.value - 1;
  }

  private isLastLevel(): boolean {
    return this.levelNumber$.value === TOTAL_LEVELS;
  }
}
