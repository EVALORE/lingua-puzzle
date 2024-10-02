import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  public levels = [1, 2, 3, 4, 5, 6];

  public currentLevel = signal(1);

  public setLevel(levelIndex: number): void {
    this.currentLevel.set(levelIndex);
  }

  public get levelUrl(): string {
    return `project-data/data/wordCollectionLevel${String(this.currentLevel())}.json`;
  }
}
