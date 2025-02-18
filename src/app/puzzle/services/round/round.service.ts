import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, switchMap } from 'rxjs';
import { LevelService } from '../level/level.service';
import { HttpDataService } from '../http-data/http-data.service';

const DEFAULT_ROUND_INDEX = 0;

@Injectable()
export class RoundService {
  private readonly httpDataService = inject(HttpDataService);
  private readonly levelService = inject(LevelService);

  private readonly roundIndex$$ = new BehaviorSubject<number>(DEFAULT_ROUND_INDEX);
  public readonly roundIndex$ = this.roundIndex$$.asObservable();

  public readonly rounds$ = this.levelService.levelNumber$.pipe(
    switchMap((levelNumber) =>
      this.httpDataService.getLevel(levelNumber).pipe(map((level) => level.rounds)),
    ),
  );

  public readonly round$ = combineLatest([this.roundIndex$$, this.rounds$]).pipe(
    map(([roundIndex, rounds]) => rounds[roundIndex]),
  );
}
