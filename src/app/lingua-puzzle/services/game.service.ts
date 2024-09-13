import { Injectable, signal } from '@angular/core';
import { shuffle } from '../../shared/utils/shuffle';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly exampleSentence = 'the quick brown fox jumps over the lazy dog';

  public result = signal<string[]>([]);
  public source = signal<string[]>(shuffle<string>(this.exampleSentence.split(' ')));

  public moveToResult(wordIndex: number): void {
    this.result.set([...this.result(), this.source()[wordIndex]]);
    this.source().splice(wordIndex, 1);
  }

  public moveToSource(wordIndex: number): void {
    this.source.set([...this.source(), this.result()[wordIndex]]);
    this.result().splice(wordIndex, 1);
  }
}
