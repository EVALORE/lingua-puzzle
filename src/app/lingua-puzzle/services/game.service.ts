import { Injectable, signal } from '@angular/core';
import { shuffle } from '../../shared/utils/shuffle';

interface Card {
  word: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  // private readonly exampleSentence = 'the quick brown fox jumps over the lazy dog';
  private readonly exampleSentence = 'the quick brown fox';

  public isWin = signal(false);

  public source = signal<Card[]>(
    shuffle<string>(this.exampleSentence.split(' ')).map((word) => ({ word, replace: false })),
  );
  public result = signal<Card[]>([]);

  public get charInSentence(): number {
    return this.exampleSentence.replace(/\s/g, '').length;
  }

  public moveToResult(wordIndex: number): void {
    this.result.set([...this.result(), this.source()[wordIndex]]);
    this.source.update((source) => source.filter((_, index) => index !== wordIndex));
    this.checkSentence();
  }

  public moveToSource(wordIndex: number): void {
    this.source.set([...this.source(), this.result()[wordIndex]]);
    this.result.update((result) => result.filter((_, index) => index !== wordIndex));
  }

  private checkSentence(): void {
    const wordsInResult = this.result()
      .map((card) => card.word)
      .join(' ');

    if (wordsInResult === this.exampleSentence) {
      this.isWin.set(true);
    }
  }
}
