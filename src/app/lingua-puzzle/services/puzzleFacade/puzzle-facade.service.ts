import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, defer, map, switchMap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../core/storage/services/local-storage/local-storage.service';
import { HttpDataService } from '../../../core/services/http-data.service';
import { GameError } from '../../../shared/errors/game.error';

enum CompletionStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
}

export const amountOfLevels = 6;

const defaultState = {
  level: 1,
  round: 0,
  sentenceIndex: 0,
};

@Injectable()
export class PuzzleFacadeService {
  private readonly httpDataService = inject(HttpDataService);
  private readonly localStorageService = inject(LocalStorageService);

  private readonly status$$ = new BehaviorSubject<CompletionStatus>(CompletionStatus.IN_PROGRESS);
  public readonly status$ = this.status$$.asObservable();

  private readonly roundIndex$$ = new BehaviorSubject<number>(0);
  private readonly levelNumber$$ = new BehaviorSubject<number>(1);

  private readonly levelData$ = this.levelNumber$$.pipe(
    switchMap((levelNumber) =>
      defer(() =>
        this.isValidLevelNumber(levelNumber)
          ? this.httpDataService.getLevelData(levelNumber)
          : throwError(() => new GameError('No such level')),
      ),
    ),
  );

  public readonly round = combineLatest([this.levelData$, this.roundIndex$$]).pipe(
    map(([levelData, roundIndex]) => levelData.rounds[roundIndex]),
  );

  public initGame(): void {
    this.getStateFromLocalStorage();
  }

  public setLevel(levelNumber: number): void {
    this.setLevelNumber(levelNumber);
    this.setRound(0);
  }

  public setRound(roundIndex: number): void {
    this.setRoundIndex(roundIndex);
    this.status$$.next(CompletionStatus.IN_PROGRESS);
  }

  public saveGame(): void {
    this.saveStateToLocalStorage();
  }

  private setRoundIndex(roundIndex: number): void {
    this.roundIndex$$.next(roundIndex);
  }

  private setLevelNumber(levelNumber: number): void {
    this.levelNumber$$.next(levelNumber);
  }

  private getStateFromLocalStorage(): void {
    const state = this.localStorageService.getItem('game', defaultState);
    this.setLevelNumber(state.level);
    this.setRoundIndex(state.round);
  }

  private saveStateToLocalStorage(): void {
    this.localStorageService.setItem('game', {
      level: this.levelNumber$$.value,
      round: this.roundIndex$$.value,
      sentenceIndex: 0,
    });
  }

  private isValidLevelNumber(levelNumber: number): boolean {
    return levelNumber <= amountOfLevels && levelNumber > 0;
  }
}
