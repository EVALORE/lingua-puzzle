import { inject, Injectable, signal } from '@angular/core';
import { Level, Round } from '../../../shared/types/http-data.interface';
import { Subject, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

enum CompletionStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
}

interface LevelProgress {
  status: CompletionStatus;
  rounds: CompletionStatus[];
}

@Injectable({
  providedIn: 'root',
})
export class LevelsService {
  private readonly httpClient = inject(HttpClient);

  public numberOfLevels = 6;
  public levelsProgress = this.initLevels();
  public currentLevel = signal(1);

  public roundsProgress: CompletionStatus[] = [];
  public level = new Subject<Level>();
  public round = new Subject<Round>();
  public roundIndex = 0;

  constructor() {
    this.httpClient
      .get<Level>(this.levelUrl)
      .pipe(take(1))
      .subscribe((level) => {});
  }

  public initLevels(): LevelProgress[] {
    return Array.from(
      { length: this.numberOfLevels },
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
    this.round.next(this.rounds[roundIndex]);
  }

  public nextRound(): void {
    this.roundsProgress[this.roundIndex] = CompletionStatus.COMPLETED;
    if (this.roundIndex < this.rounds.length - 1) {
      this.setRound(this.roundIndex + 1);
    }
  }

  public areRoundsCompleted(): boolean {
    return this.roundsProgress.every((status) => status === CompletionStatus.COMPLETED);
  }

  public get levelUrl(): string {
    return `project-data/data/wordCollectionLevel${String(this.currentLevel())}.json`;
  }
}
