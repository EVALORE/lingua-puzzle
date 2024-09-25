import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { WordCardDirective } from '../../directives/word-card.directive';
import { MatCard } from '@angular/material/card';
import { Card } from '../../../shared/types/card.interface';
import {
  AnimationTransitionMetadata,
  transition,
  style,
  animate,
  trigger,
} from '@angular/animations';

function gapCollapseAnimation(): AnimationTransitionMetadata {
  return transition(':leave', [
    style({ opacity: 0 }),
    animate('600ms ease-in', style({ width: 0, padding: 0 })),
  ]);
}

interface CardStyles {
  width: string;
  backgroundImage: string;
  backgroundSize: string;
  backgroundPosition: string;
  backgroundRepeat: string;
}

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CdkDropList, WordCardDirective, MatCard, CdkDrag],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('filterAnimation', [gapCollapseAnimation()])],
})
export class CardListComponent {
  public readonly listType = input.required<'result' | 'source' | 'completed'>();
  public readonly cardList = input.required<Card[]>();
  public readonly picture = input.required<string>();
  public readonly onCardMove = output<number>();

  protected getCardStyles(card: Card, resultHeight: string): CardStyles {
    return {
      width: card.width,
      backgroundImage: `url(${this.picture()})`,
      backgroundSize: `700px ${resultHeight}`,
      backgroundPosition: `-${String(card.xOffset)}px -${String(card.yOffset)}px`,
      backgroundRepeat: 'no-repeat',
    };
  }
}
