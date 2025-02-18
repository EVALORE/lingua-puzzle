import { Injectable } from '@angular/core';
import { Card } from '../../types/card';
import { PositionStatus } from '../../enums/position-status';
import { puzzleWidth } from '../../consts/ui-layout.const';

@Injectable()
export class CardService {
  public createCardsFromSentence(sentence: string): Card[] {
    return sentence.split(' ').map(
      (word, index): Card => ({
        word,
        width: this.calculateCardWidth(word, sentence),
        originalIndex: index,
        positionStatus: PositionStatus.PENDING,
      }),
    );
  }

  private calculateCardWidth(word: string, sentence: string): number {
    return (word.length / sentence.replace(/ /gu, '').length) * puzzleWidth.number;
  }

  public sortCardsByOriginalIndex(cards: Card[]): Card[] {
    return cards.sort((a, b) => a.originalIndex - b.originalIndex);
  }

  public resetCardsPositionStatus(cards: Card[]): Card[] {
    return cards.map((card) => ({ ...card, positionStatus: PositionStatus.PENDING }));
  }

  public updateCardsPositionStatus(cards: Card[]): Card[] {
    return cards.map((card, index) => ({
      ...card,
      positionStatus: index === card.originalIndex ? PositionStatus.CORRECT : PositionStatus.WRONG,
    }));
  }
}
