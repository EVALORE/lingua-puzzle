import { computed, inject, Injectable, signal } from '@angular/core';
import { SentenceService } from '../sentence/sentence.service';
import { CardService } from '../card/card.service';
import { Card } from '../../../shared/types/card.interface';
import { PositionStatus } from '../../../shared/enums/position-status';

@Injectable({
  providedIn: 'root',
})
export class PuzzleService {
  private readonly sentenceService = inject(SentenceService);
  private readonly cardService = inject(CardService);

  public source = signal<Card[]>([]);
  public result = signal<Card[]>([]);
  public completedSentences: Card[][] = [];

  public isSourceEmpty = computed(() => this.source().length === 0);
  public readonly arePositionsCorrect = computed(() =>
    this.result().every((card) => card.positionStatus === PositionStatus.CORRECT),
  );

  constructor() {
    this.sentenceService.sentence.subscribe((sentence) => {
      const { sentenceIndex } = this.sentenceService;
      const words = sentence.textExample.split(' ');
      this.source.set(this.cardService.createCardsFromWords(words, sentenceIndex));
    });
  }

  public nextSentence(): void {
    this.completedSentences.push(this.result());
    this.result.set([]);
    this.sentenceService.nextSentence();
  }

  public moveToSource(wordIndex: number): void {
    this.cardService.resetCardsPosition(this.result());
    this.source.set([...this.source(), this.result()[wordIndex]]);
    this.result.update((result) => result.filter((_, index) => index !== wordIndex));
  }

  public moveToResult(wordIndex: number): void {
    this.result.set([...this.result(), this.source()[wordIndex]]);
    this.source.update((source) => source.filter((_, index) => index !== wordIndex));
  }

  public updateCardsPositionStatus(): void {
    this.result.update(this.cardService.updateCardsPositionStatus.bind(this));
  }

  public sortCardsByOriginalIndex(): void {
    this.cardService.sortCardsByOriginalIndex(this.result());
    this.updateCardsPositionStatus();
  }
}
