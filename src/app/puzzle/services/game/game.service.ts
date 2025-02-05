import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../../types/card';
import { CardService } from '../card/card.service';

@Injectable()
export class GameService {
  private readonly cardService = inject(CardService);
  public readonly source$ = new BehaviorSubject<Card[]>([]);
  public readonly result$ = new BehaviorSubject<Card[]>([]);

  public setSource(sentence: string): void {
    this.source$.next(this.cardService.createCardsFromSentence(sentence));
  }

  public moveToResult(wordIndex: number): void {
    this.moveCard(wordIndex, this.source$, this.result$);
  }

  public moveToSource(wordIndex: number): void {
    this.result$.next(this.cardService.resetCardsPositionStatus(this.result$.getValue()));
    this.moveCard(wordIndex, this.result$, this.source$);
  }

  public moveCard(
    cardIndex: number,
    from$: BehaviorSubject<Card[]>,
    to$: BehaviorSubject<Card[]>,
  ): void {
    const from = from$.getValue();
    const to = to$.getValue();

    to$.next([...to, from[cardIndex]]);
    from$.next([...from.filter((_, index) => index !== cardIndex)]);
  }
}
