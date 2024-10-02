import { Injectable, signal } from '@angular/core';

enum CompletionStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
}

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  public levels: { level: number; status: CompletionStatus }[] = [
    { level: 1, status: CompletionStatus.PENDING },
    { level: 2, status: CompletionStatus.PENDING },
    { level: 3, status: CompletionStatus.PENDING },
    { level: 4, status: CompletionStatus.PENDING },
    { level: 5, status: CompletionStatus.PENDING },
    { level: 6, status: CompletionStatus.PENDING },
  ];

  public currentLevel = signal(1);

  public setLevel(levelIndex: number): void {
    this.currentLevel.set(levelIndex);
  }

  public get levelUrl(): string {
    return `project-data/data/wordCollectionLevel${String(this.currentLevel())}.json`;
  }
}
