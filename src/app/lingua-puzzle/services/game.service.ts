import { PositionStatus } from '../../shared/enums/position-status';
import { effect, inject, Injectable, signal } from '@angular/core';
import { shuffle } from '../../shared/utils/shuffle';
import { Card } from '../../shared/types/card.interface';
import { SentenceService } from './sentence/sentence.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly sentenceService = inject(SentenceService);

  public isWin = signal(false);
  public source = signal<Card[]>([]);
  public result = signal<Card[]>([]);
  public sentence = this.sentenceService.sentence;

  private xOffsetSum = 0;

  constructor() {}

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
}
