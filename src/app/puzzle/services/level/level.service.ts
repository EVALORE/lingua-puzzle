import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_LEVEL, TOTAL_LEVELS } from '../../consts/default_values.const';

@Injectable()
export class LevelService {
  private readonly levelNumber$$ = new BehaviorSubject<number>(DEFAULT_LEVEL);
  public readonly levelNumber$ = this.levelNumber$$.asObservable();

  public setLevel(levelNumber = DEFAULT_LEVEL): void {
    if (this.isValidLevelNumber(levelNumber)) {
      this.levelNumber$$.next(levelNumber);
    }
  }

  private isValidLevelNumber(levelNumber: number): boolean {
    return levelNumber >= DEFAULT_LEVEL && levelNumber <= TOTAL_LEVELS;
  }
}
