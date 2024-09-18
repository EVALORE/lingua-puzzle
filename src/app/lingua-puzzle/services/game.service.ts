import { Injectable, signal } from '@angular/core';
import { shuffle } from '../../shared/utils/shuffle';

interface Card {
  word: string;
  order: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly exampleSentence = 'the quick brown fox jumps over the lazy dog';

  public source = signal<Card[]>(
    shuffle<string>(this.exampleSentence.split(' ')).map((word, index) => ({ word, order: index })),
  );
  public result = signal<Card[]>([]);

  public get charInSentence(): number {
    return this.exampleSentence.replace(/\s/g, '').length;
  }

  public moveToResult(wordIndex: number): void {
    this.result.set([...this.result(), this.source()[wordIndex]]);
    this.source.update((source) => source.filter((_, index) => index !== wordIndex));
  }

  public moveToSource(wordIndex: number): void {
    this.source.set([...this.source(), this.result()[wordIndex]]);
    this.result.update((result) => result.filter((_, index) => index !== wordIndex));
  }
}
