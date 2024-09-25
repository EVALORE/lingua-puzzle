import { PositionStatus } from '../../shared/enums/position-status';
import { inject, Injectable, signal } from '@angular/core';
import { Picture, Round, Sentence } from '../../shared/types/http-data.interface';
import { shuffle } from '../../shared/utils/shuffle';
import { HttpDataService } from '../../core/services/http-data.service';
import { Card } from '../../shared/types/card.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public isWin = signal(false);
  public dataLoaded = signal(false);
  private readonly httpData = inject(HttpDataService);

  public sentences: Sentence[] = [];
  private sentenceId = 0;
  private currentRound = 0;
  private xOffsetSum = 0;

  public source = signal<Card[]>([]);
  public result = signal<Card[]>([]);

  public round = signal({} as Round);
  public sentence = signal({} as Sentence);
  public picture = signal({} as Picture);

  constructor() {
    this.httpData.getRounds().subscribe((rounds) => {
      this.round.set(rounds[this.currentRound]);
      this.sentences = this.round().words;
      this.picture.set(this.round().levelData);

      this.setSentence(this.sentences);
      this.dataLoaded.set(true);
    });
  }

  public setSentence(sentences: Sentence[]): void {
    this.result.set([]);
    this.isWin.set(false);
    this.xOffsetSum = 0;

    this.sentence.set(sentences[this.sentenceId]);
    this.source.set(this.createCardsFromSentence(this.sentence().textExample));
  }

  public nextSentence(): void {
    if (this.isLastSentence()) {
      this.currentRound += 1;
      this.httpData.getRounds().subscribe((rounds) => {
        this.sentences = rounds[this.currentRound].words;
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
    return shuffle<Card>(sentence.split(' ').map(this.createCard.bind(this)));
  }

  private createCard(word: string, index: number, array: string[]): Card {
    this.xOffsetSum += array[index - 1] ? this.calculateCardWidth(array[index - 1].length) : 0;

    return {
      word,
      width: `${String(this.calculateCardWidth(word.length))}px`,
      positionStatus: PositionStatus.PENDING,
      originalIndex: index,
      xOffset: this.xOffsetSum,
      yOffset: this.sentenceId * 35,
    };
  }

  private calculateCardWidth(numberOfChars: number): number {
    return (numberOfChars * 700) / this.charInSentence;
  }

  public get charInSentence(): number {
    return this.sentence().textExample.replace(/\s/g, '').length;
  }

  public moveToResult(wordIndex: number): void {
    this.result.set([...this.result(), this.source()[wordIndex]]);
    this.source.update((source) => source.filter((_, index) => index !== wordIndex));
  }

  public moveToSource(wordIndex: number): void {
    this.resetCardsStatus();
    this.source.set([...this.source(), this.result()[wordIndex]]);
    this.result.update((result) => result.filter((_, index) => index !== wordIndex));
    this.isWin.set(false);
  }

  public sortCardsInCorrectOrder(): void {
    this.result.update((result) =>
      result.sort(
        (currentCard, precedentCard) => currentCard.originalIndex - precedentCard.originalIndex,
      ),
    );
    this.checkCards();
  }

  public checkCards(): void {
    this.updateCardsPositionStatus(this.result());
    this.updateIsWin();
  }

  private checkResultCorrectness(): boolean {
    return this.result().every((card) => card.positionStatus === PositionStatus.CORRECT);
  }

  private updateIsWin(): void {
    this.isWin.set(this.checkResultCorrectness());
  }

  private resetCardsStatus(): void {
    this.result().forEach((card) => {
      card.positionStatus = PositionStatus.PENDING;
    });
  }

  private updateCardsPositionStatus(cards: Card[]): void {
    const sentenceWords = this.sentence().textExample.split(' ');
    this.result.set(
      cards.map((card, index) => {
        card.positionStatus =
          card.word === sentenceWords[index] ? PositionStatus.CORRECT : PositionStatus.WRONG;

        return card;
      }),
    );
  }
}
