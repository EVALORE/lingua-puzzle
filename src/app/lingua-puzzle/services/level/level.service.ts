import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  public levels = [1, 2, 3, 4, 5, 6];
  public currentLevel = 1;

  public get levelUrl(): string {
    return `project-data/data/wordCollectionLevel${String(this.currentLevel)}.json`;
  }
}
