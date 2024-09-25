import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  public currentLevel = 1;

  public get levelUrl(): string {
    return `project-data/data/wordCollectionLevel${String(this.currentLevel)}.json`;
  }
}

