import { Injectable, signal } from '@angular/core';
import { shuffle } from '../../shared/utils/shuffle';
import { Card } from '../components/word-card/word-card.component';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly exampleSentence = 'the quick brown fox jumps over the lazy dog';

  public source = signal<Card[]>(
    shuffle<string>(this.exampleSentence.split(' ')).map((word) => ({ word, replace: false })),
  );
  public result = signal<Card[]>([]);

  public moveToResult(wordIndex: number): void {
    this.result.set([...this.result(), this.source()[wordIndex]]);
    this.source.update((source) => source.filter((_, index) => index !== wordIndex));
  }

  public moveToSource(wordIndex: number): void {
    this.source.set([...this.source(), this.result()[wordIndex]]);
    this.result.update((result) => result.filter((_, index) => index !== wordIndex));
  }
}
