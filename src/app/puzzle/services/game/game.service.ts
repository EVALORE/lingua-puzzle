import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Card } from '../../types/card';
import { CardService } from '../card/card.service';
import { shuffle } from '../../utils/shuffle';

const DEFAULT_SENTENCE_INDEX = 0;

@Injectable()
export class GameService {
  private readonly cardService = inject(CardService);

  public readonly sentenceIndex = signal<number>(DEFAULT_SENTENCE_INDEX);
  public readonly completedSentences = signal<Card[][]>([]);
  public readonly source = signal<Card[]>([]);
  public readonly result = signal<Card[]>([]);

  public setSource(sentenceValue: string): void {
    const cards = this.cardService.createCardsFromSentence(sentenceValue);
    this.source.set(shuffle(cards));
  }

  public autocompleteResult(): void {
    this.result.update(this.cardService.sortCardsByOriginalIndex.bind(this));
    this.updateResultPositionStatus();
  }

  public updateResultPositionStatus(): void {
    this.result.update(this.cardService.updateCardsPositionStatus.bind(this));
  }

  public clearAll(): void {
    this.clearCompletedSentences();
    this.clearSource();
    this.clearResult();
    this.setSentenceIndex();
  }

  private clearCompletedSentences(): void {
    this.completedSentences.set([]);
  }

  private clearSource(): void {
    this.source.set([]);
  }

  private clearResult(): void {
    this.result.set([]);
  }

  public nextSentenceIndex(): void {
    this.setSentenceIndex(this.sentenceIndex() + 1);
  }

  public setSentenceIndex(sentenceIndex = DEFAULT_SENTENCE_INDEX): void {
    this.sentenceIndex.set(sentenceIndex);
  }

  public moveResultToCompleted(): void {
    this.completedSentences.update((completed) => [...completed, this.result()]);
    this.clearResult();
  }

  public moveCardToResult(cardIndex: number): void {
    this.moveCard(cardIndex, this.source, this.result);
  }

  public moveCardToSource(cardIndex: number): void {
    this.result.update(this.cardService.resetCardsPositionStatus.bind(this));
    this.moveCard(cardIndex, this.result, this.source);
  }

  public moveCard(
    cardIndex: number,
    from: WritableSignal<Card[]>,
    to: WritableSignal<Card[]>,
  ): void {
    to.update((cards) => [...cards, from()[cardIndex]]);
    from.update((cards) => cards.filter((_, index) => index !== cardIndex));
  }
}
