import { inject, Injectable, signal } from '@angular/core';
import { Word } from '../../shared/types/http-data.interface';
import { shuffle } from '../../shared/utils/shuffle';
import { HttpDataService } from '../../core/services/http-data.service';
import { Card } from '../../shared/types/card.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public isWin = signal(false);
  private readonly httpData = inject(HttpDataService);

  private readonly exampleSentence = 'the quick brown fox jumps over the lazy dog';

  public sentences: Word[] = [];
  private sentenceId = 9;
  private currentRound = 0;
  public sentence = '';

  public source = signal<Card[]>([]);
  public result = signal<Card[]>([]);

  constructor() {
    this.httpData.getRound(this.currentRound).subscribe((round) => {
      this.sentences = round.words;
      this.setSentence(this.sentences);
    });
  }

  public setSentence(sentences: Word[]): void {
    this.result.set([]);
    this.isWin.set(false);
    this.sentence = sentences[this.sentenceId].textExample;
    this.source.set(this.createCardsFromSentence(this.sentence));
  }

  public nextSentence(): void {
    if (this.isLastSentence()) {
      this.currentRound += 1;
      this.httpData.getRound(this.currentRound).subscribe((round) => {
        this.sentences = round.words;
        this.setSentence(this.sentences);
      });
      return;
    }
    this.sentenceId = (this.sentenceId + 1) % this.sentences.length;
    this.setSentence(this.sentences);
  }

  private isLastSentence(): boolean {
    return this.sentenceId === this.sentences.length - 1;
  }

  private createCardsFromSentence(sentence: string): Card[] {
    return shuffle<string>(sentence.split(' ')).map(this.createCard.bind(this));
  }

  private createCard(word: string): Card {
    return {
      word,
      width: this.calculateCardWidth(word.length),
    };
  }

  private calculateCardWidth(numberOfChars: number): string {
    return `${String((numberOfChars * 100) / this.charInSentence)}%`;
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
    this.isWin.set(false);
  }

  private checkSentence(): void {
    const wordsInResult = this.result()
      .map((card) => card.word)
      .join(' ');

    if (wordsInResult === this.sentence) {
      this.isWin.set(true);
    }
  }
}
