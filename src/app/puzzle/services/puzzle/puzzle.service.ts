import { inject, Injectable } from '@angular/core';
import { HttpDataService } from '../http-data/http-data.service';
import { DEFAULT_LEVEL, DEFAULT_ROUND_INDEX } from '../../consts/default_values.const';
import { BehaviorSubject, combineLatest, map, switchMap, tap } from 'rxjs';

@Injectable()
export class PuzzleService {
  private readonly httpDataService = inject(HttpDataService);

  public readonly levelNumber$ = new BehaviorSubject(DEFAULT_LEVEL);
  private readonly roundIndex$ = new BehaviorSubject(DEFAULT_ROUND_INDEX);

  public readonly roundCount$ = new BehaviorSubject(0);

  private rounds$ = this.levelNumber$.pipe(
    switchMap((levelNumber) =>
      this.httpDataService.getLevel(levelNumber).pipe(
        tap((level) => {
          this.roundCount$.next(level.roundsCount);
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
}
