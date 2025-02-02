import { inject, Injectable } from '@angular/core';
import { RoundService } from '../round/round.service';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { Card } from '../../types/card';
import { CardService } from '../card/card.service';

const DEFAULT_SENTENCE_INDEX = 0;

@Injectable()
export class GameService {
  private readonly roundService = inject(RoundService);
  private readonly cardService = inject(CardService);
  public readonly sentenceIndex$$ = new BehaviorSubject<number>(DEFAULT_SENTENCE_INDEX);
  public readonly source$ = new BehaviorSubject<Card[]>([]);
  public readonly result$ = new BehaviorSubject<Card[]>([]);

  public readonly isSourceEmpty$ = this.source$.pipe(map((source) => !source.length));

  public readonly sentence$ = combineLatest([this.sentenceIndex$$, this.roundService.round$]).pipe(
    map(([sentenceIndex, round]) => round.words[sentenceIndex]),
    tap((sentence) => {
      const cards = this.cardService.createCardsFromSentence(sentence.textExample);
      this.source$.next(cards);
    }),
  );

  public moveToResult(wordIndex: number): void {
    this.moveCard(wordIndex, this.source$, this.result$);
  }

  public moveToSource(wordIndex: number): void {
    this.moveCard(wordIndex, this.result$, this.source$);
  }

  private moveCard(
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
