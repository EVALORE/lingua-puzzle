import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { SentenceService } from '../sentence/sentence.service';
import { CardService } from '../card/card.service';
import { Card } from '../../../shared/types/card.interface';
import { PositionStatus } from '../../../shared/enums/position-status';
import { RoundService } from '../round/round.service';

@Injectable({
  providedIn: 'any',
})
export class PuzzleService {
  private readonly sentenceService = inject(SentenceService);
  private readonly cardService = inject(CardService);

  public source = signal<Card[]>([]);
  public result = signal<Card[]>([]);
  public completedSentences = signal<Card[][]>([]);

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
    this.completedSentences.update((sentences) => [...sentences, this.result()]);
    this.result.set([]);
    this.sentenceService.nextSentence();
  }

  public moveToSource(cardIndex: number): void {
    this.cardService.resetCardsPosition(this.result());
    this.swapCard(cardIndex, this.result, this.source);
  }

  public moveToResult(cardIndex: number): void {
    this.swapCard(cardIndex, this.source, this.result);
  }

  private swapCard(
    cardIndex: number,
    source: WritableSignal<Card[]>,
    target: WritableSignal<Card[]>,
  ) {
    target.update((cards) => [...cards, source()[cardIndex]]);
    source.update((cards) => cards.filter((_, index) => index !== cardIndex));
  }

  public updateCardsPositionStatus(): void {
    this.result.update(this.cardService.updateCardsPositionStatus.bind(this));
  }

  public sortCardsByOriginalIndex(): void {
    this.cardService.sortCardsByOriginalIndex(this.result());
    this.updateCardsPositionStatus();
  }
}
