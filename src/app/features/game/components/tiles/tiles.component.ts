import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Tile } from '../../types/tile';
import { tileHeight } from '../../consts/ui-layout.const';
import { MatCard } from '@angular/material/card';
import { PositionStatus } from '../../enums/position-status';
import { fullImagePath } from '@shared/utils/fullImagePath';

interface CardStyles {
  width: string;
  height: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  backgroundRepeat?: string;
}

interface TileClassNames {
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
  public readonly backgroundImage = input<{ url: string; size: string }>();
  public solved = input<boolean>();
  public readonly cardClick = output<number>();

  protected getTileStyles({ width, xOffset, yOffset }: Tile): CardStyles {
    const background = this.backgroundImage();
    const backgroundStyles = background
      ? {
          backgroundImage: `url(${fullImagePath(background.url)})`,
          backgroundSize: background.size,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `-${String(xOffset)}px -${String(yOffset)}px`,
          color: '#fff',
        }
      : {};

    return {
      width: `${String(width)}px`,
      height: tileHeight.px,
      ...backgroundStyles,
    };
  }

  protected getTileClassNames(tile: Tile): TileClassNames {
    if (this.solved()) {
      return { solved: true };
    }

    return {
      wrong: tile.positionStatus === PositionStatus.WRONG,
      correct: tile.positionStatus === PositionStatus.CORRECT,
    };
  }
}
