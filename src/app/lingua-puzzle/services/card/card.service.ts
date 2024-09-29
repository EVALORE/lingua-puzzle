import { Injectable } from '@angular/core';
import { PositionStatus } from '../../../shared/enums/position-status';
import { Card } from '../../../shared/types/card.interface';
import { shuffle } from '../../../shared/utils/shuffle';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public createCardsFromWords(words: string[], sentenceIndex: number): Card[] {
    let xOffSetSum = 0;
    const cards = words.map((word, index) => {
      const card: Card = {
        word,
        width: this.calculateCardWidth(word, words),
        originalIndex: index,
        positionStatus: PositionStatus.PENDING,
        xOffset: xOffSetSum,
        yOffset: sentenceIndex * 35,
      };

      xOffSetSum += card.width;
      return card;
    });

    return shuffle<Card>(cards);
  }

  private calculateCardWidth(word: string, words: string[]): number {
    return (word.length * 700) / words.join('').length;
  }

  public sortCardsByOriginalIndex(cards: Card[]): Card[] {
    return cards.sort(
      (currentCard, precedentCard) => currentCard.originalIndex - precedentCard.originalIndex,
    );
  }

  public resetCardsPosition(cards: Card[]): Card[] {
    return cards.map((card) => {
      card.positionStatus = PositionStatus.PENDING;

      return card;
    });
  }

  public updateCardsPositionStatus(cards: Card[]): Card[] {
    return cards.map((card, index) => {
      card.positionStatus =
        index === card.originalIndex ? PositionStatus.CORRECT : PositionStatus.WRONG;

      return card;
    });
  }
}
