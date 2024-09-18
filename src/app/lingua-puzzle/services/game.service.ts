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
      this.sentence = this.sentences[this.sentenceId].textExample;
      this.source.set(this.createCardsFromSentence(this.sentence));
    });
  }

  private createCardsFromSentence(sentence: string): Card[] {
    return shuffle<string>(sentence.split(' ')).map((word, index) => ({ word, order: index }));
  }

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
