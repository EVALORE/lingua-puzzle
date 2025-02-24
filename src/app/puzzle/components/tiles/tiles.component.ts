import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Tile } from '../../types/tile';
import { cardHeight } from '../../consts/ui-layout.const';
import { MatCard } from '@angular/material/card';
import { PositionStatus } from '../../enums/position-status';

interface CardStyles {
  width: string;
  height: string;
}

interface CardClassNames {
  solved?: boolean;
  wrong?: boolean;
  correct?: boolean;
}

@Component({
  selector: 'app-tiles',
  imports: [MatCard],
  templateUrl: './tiles.component.html',
  styleUrl: './tiles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TilesComponent {
  public readonly tiles = input.required<Tile[]>();
  public solved = input<boolean>();
  public readonly cardClick = output<number>();

  protected getCardStyles({ width }: Tile): CardStyles {
    return {
      width: `${String(width)}px`,
      height: cardHeight.px,
    };
  }

  protected getCardClassNames(card: Tile): CardClassNames {
    if (this.solved()) {
      return { solved: true };
    }

    return {
      wrong: card.positionStatus === PositionStatus.WRONG,
      correct: card.positionStatus === PositionStatus.CORRECT,
    };
  }
}
