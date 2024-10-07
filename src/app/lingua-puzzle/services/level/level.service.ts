import { Injectable, signal } from '@angular/core';

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
export class LevelService {
  public numberOfLevels = 6;
  public levels = this.initLevels();
  public currentLevel = signal(1);

  public setLevel(levelIndex: number): void {
    this.currentLevel.set(levelIndex);
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

  public get levelUrl(): string {
    return `project-data/data/wordCollectionLevel${String(this.currentLevel())}.json`;
  }
}
