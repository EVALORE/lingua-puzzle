import { inject, Injectable, signal } from '@angular/core';
import { shuffle } from '../../shared/utils/shuffle';
import { HttpDataService } from '../../core/services/http-data.service';
import { Word } from '../../core/services/http-data.interface';

interface Card {
  word: string;
  order: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public isWin = signal(false);
  private readonly httpData = inject(HttpDataService);

  private readonly exampleSentence = 'the quick brown fox jumps over the lazy dog';

  public sentences: Word[] = [];
  private sentenceId = 0;
  private sentence = '';

  public source = signal<Card[]>([]);
  public result = signal<Card[]>([]);

  constructor() {
    this.httpData.getRound().subscribe((round) => {
      this.sentences = round.words;
      this.setSentence(this.sentences);
    });
  }

  public setSentence(sentences: Word[]): void {
    this.sentence = sentences[this.sentenceId].textExample;
    this.source.set(this.createCardsFromSentence(this.sentence));
  }

  private createCardsFromSentence(sentence: string): Card[] {
    return shuffle<string>(sentence.split(' ')).map((word, index) => ({ word, order: index }));
  }

  public get charInSentence(): number {
    return this.sentence.replace(/\s/g, '').length;
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
