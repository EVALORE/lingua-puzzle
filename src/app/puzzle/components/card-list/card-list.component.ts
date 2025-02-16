import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Card } from '../../types/card';
import { cardHeight } from '../../consts/ui-layout.const';
import { MatCard } from '@angular/material/card';
import { PositionStatus } from '../../enums/position-status';

interface CardStyles {
  width: string;
  height: string;
}

interface CardClassNames {
  card?: boolean;
  wrong?: boolean;
  correct?: boolean;
  'first-word'?: boolean;
  'last-word'?: boolean;
}

type ListType = 'result' | 'source' | 'completed';

@Component({
  selector: 'app-card-list',
  imports: [MatCard],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {
  public readonly list = input.required<{
    cards: Card[];
    type: ListType;
  }>();

  public readonly cardClick = output<number>();

  protected getCardStyles({ width }: Card): CardStyles {
    return {
      width: `${String(width)}px`,
      height: cardHeight.px,
    };
  }

  protected getCardClassNames(card: Card, index?: number): CardClassNames {
    const list = this.list();
    return list.type === 'completed'
      ? {
          card: true,
          'first-word': !index,
          'last-word': index === list.cards.length - 1,
        }
      : {
          card: true,
          wrong: card.positionStatus === PositionStatus.WRONG,
          correct: card.positionStatus === PositionStatus.CORRECT,
        };
  }
}
