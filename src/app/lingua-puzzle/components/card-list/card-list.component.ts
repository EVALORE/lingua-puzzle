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

  public readonly source = input<Card[]>();
  public readonly picture = input<string>();
  public readonly onCardMove = output<number>();
}
