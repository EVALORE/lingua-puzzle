import { inject, Injectable } from '@angular/core';
import { HttpDataService } from '../http-data/http-data.service';
import {
  DEFAULT_LEVEL,
  DEFAULT_ROUND_INDEX,
  TOTAL_LEVELS,
} from '../../consts/default_values.const';
import {BehaviorSubject, combineLatest, map, switchMap, tap} from 'rxjs';
import {LocalStorageService} from '../../../core/storage/local-storage/local-storage.service';

@Injectable()
export class PuzzleService {
  private readonly httpDataService = inject(HttpDataService);
  private readonly localStorage = inject(LocalStorageService);

  public readonly levelNumber$ = new BehaviorSubject(DEFAULT_LEVEL);
  public readonly roundIndex$ = new BehaviorSubject(DEFAULT_ROUND_INDEX);
  public roundsCount = 0;

  public readonly rounds$ = this.levelNumber$.pipe(
    switchMap((levelNumber) =>
      this.httpDataService.getLevel(levelNumber).pipe(
        map((level) => level.puzzles),
        tap((rounds) => {this.roundsCount = rounds.length;})
      ),
    ),
  );

  public readonly round$ = combineLatest([this.rounds$, this.roundIndex$]).pipe(
    map(([rounds, roundIndex]) => rounds[roundIndex]),
  );

  public  readonly puzzleData = combineLatest({
    round: this.roundIndex$,
    level: this.levelNumber$,
  }).pipe(
    map((data) => ({
      ...data,
      roundsCount: this.roundsCount,
      levelsCount: TOTAL_LEVELS,
    })),
    tap((data) => {
      this.updateGameStateInLocalStorage(data.round, data.level);
    }),
  );

  private updateGameStateInLocalStorage(round: number, level: number): void {
    this.localStorage.setItem('game', { level, round, sentenceIndex: 0 });
  }

  public updateCurrent(): void {
    const defaultValue = {
      round: DEFAULT_ROUND_INDEX,
      level: DEFAULT_LEVEL,
      sentenceIndex: 0,
    };
    const { level, round } = this.localStorage.getItem('game', defaultValue);
    this.setRoundIndex(round);
    this.setLevelNumber(level);
  }

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
    return this.roundIndex$.value === this.roundsCount - 1;
  }

  private isLastLevel(): boolean {
    return this.levelNumber$.value === TOTAL_LEVELS;
  }
}
