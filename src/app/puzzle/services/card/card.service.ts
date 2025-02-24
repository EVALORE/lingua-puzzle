import { Injectable } from '@angular/core';
import { Tile } from '../../types/tile';
import { PositionStatus } from '../../enums/position-status';
import { puzzleWidth } from '../../consts/ui-layout.const';

@Injectable()
export class CardService {
  public createCardsFromSentence(sentence: string): Tile[] {
    return sentence.split(' ').map(
      (word, index): Tile => ({
        word,
        width: this.calculateCardWidth(word, sentence),
        initialIndex: index,
        positionStatus: PositionStatus.PENDING,
      }),
    );
  }

  private calculateCardWidth(word: string, sentence: string): number {
    return (word.length / sentence.replace(/ /gu, '').length) * puzzleWidth.number;
  }

  public sortCardsByOriginalIndex(cards: Tile[]): Tile[] {
    return cards.sort((a, b) => a.initialIndex - b.initialIndex);
  }

  public updateCardsPositionStatus(cards: Tile[]): Tile[] {
    return cards.map((card, index) => ({
      ...card,
      positionStatus: index === card.initialIndex ? PositionStatus.CORRECT : PositionStatus.WRONG,
    }));
  }

  public resetCardsPositionStatus(cards: Tile[]): Tile[] {
    return cards.map((card) => ({ ...card, positionStatus: PositionStatus.PENDING }));
  }
}
