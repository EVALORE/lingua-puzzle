import { Injectable, signal, WritableSignal } from '@angular/core';
import { Card } from '../../types/card';

const DEFAULT_SENTENCE_INDEX = 0;

@Injectable()
export class GameService {
  public readonly sentenceIndex = signal<number>(DEFAULT_SENTENCE_INDEX);

  public setSentenceIndex(sentenceIndex = DEFAULT_SENTENCE_INDEX): void {
    this.sentenceIndex.set(sentenceIndex);
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
