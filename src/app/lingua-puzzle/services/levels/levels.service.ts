import { inject, Injectable, signal } from '@angular/core';
import { Level, Round } from '../../../shared/types/http-data.interface';
import { Observable, Subject } from 'rxjs';
import { HttpDataService } from '../../../core/services/http-data.service';

enum CompletionStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
}

interface LevelProgress {
  status: CompletionStatus;
  rounds: CompletionStatus[];
}

const numberOfLevels = 6;

@Injectable({
  providedIn: 'root',
})
export class LevelsService {
  private readonly httpDataService = inject(HttpDataService);

  public levelsProgress = this.initLevels();
  public roundsProgress: CompletionStatus[] = [];

  public numberOfRounds = 0;
  public round = new Subject<Round>();

  public getLevel(): Observable<Level> {
    return this.httpDataService.getLevel(this.levelNumber);
  }

  public initLevels(): LevelProgress[] {
    return Array.from(
      { length: numberOfLevels },
      (): LevelProgress => ({
        status: CompletionStatus.PENDING,
        rounds: [],
      }),
    );
  }

  public resetLevels(levels: LevelProgress[]): LevelProgress[] {
    return levels.map((level) => ({
      status: CompletionStatus.PENDING,
      rounds: level.rounds.map(() => CompletionStatus.PENDING),
    }));
  }

  public setRound(roundIndex: number): void {
    this.roundIndex = roundIndex;
    this.round.next(this.level.rounds[roundIndex]);
  }

  public nextRound(): void {
    this.roundsProgress[this.roundIndex] = CompletionStatus.COMPLETED;
    if (this.roundIndex < this.level) {
      this.setRound(this.roundIndex + 1);
    }
  }

  public areRoundsCompleted(): boolean {
    return this.roundsProgress.every((status) => status === CompletionStatus.COMPLETED);
  }
}
