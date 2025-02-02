import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const DEFAULT_LEVEL = 1;
const TOTAL_LEVELS = 5;

@Injectable()
export class LevelService {
  private readonly levelNumber$$ = new BehaviorSubject<number>(DEFAULT_LEVEL);
  public readonly levelNumber$ = this.levelNumber$$.asObservable();

  public setLevel(levelNumber = DEFAULT_LEVEL): void {
    if (levelNumber < DEFAULT_LEVEL || levelNumber > TOTAL_LEVELS) {
      return;
    }
    this.levelNumber$$.next(levelNumber);
  }
}
