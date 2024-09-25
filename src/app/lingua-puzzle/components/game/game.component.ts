import {
  animate,
  AnimationTransitionMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
} from '@angular/core';
import { MatCard } from '@angular/material/card';
import { WordCardDirective } from '../../directives/word-card.directive';
import { GameService } from '../../services/game.service';
import { MatButton } from '@angular/material/button';
import { Card } from '../../../shared/types/card.interface';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HintsComponent } from '../hints/hints.component';
import { CardListComponent } from '../card-list/card-list.component';

function gapCollapseAnimation(): AnimationTransitionMetadata {
  return transition(':leave', [
    style({ opacity: 0 }),
    animate('600ms ease-in', style({ width: 0, padding: 0 })),
  ]);
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    MatCard,
    WordCardDirective,
    MatButton,
    CdkDrag,
    CdkDropList,
    HintsComponent,
    CardListComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('filterAnimation', [gapCollapseAnimation()])],
})
export class GameComponent {
  private readonly gameService = inject(GameService);
  private readonly cdr = inject(ChangeDetectorRef);

  protected source = this.gameService.source;
  protected result = this.gameService.result;
  protected isWin = this.gameService.isWin;
  protected completedSentences: Card[][] = [];
  protected picture = '';

  constructor() {
    effect(() => {
      this.picture = `project-data/images/${this.gameService.picture().imageSrc}`;
    });
  }

  protected startResultAutoComplete(): void {
    this.cdr.markForCheck();
    this.gameService.sortCardsInCorrectOrder();
  }

  protected moveToSource(wordIndex: number): void {
    this.gameService.moveToSource(wordIndex);
  }

  protected moveToResult(wordIndex: number): void {
    this.gameService.moveToResult(wordIndex);
  }

  protected nextSentence(): void {
    this.pushSentenceToCompleted();
    this.gameService.nextSentence();
  }

  protected startCardsChecking(): void {
    this.gameService.checkCards();
  }

  private pushSentenceToCompleted(): void {
    this.completedSentences.push(this.result());
  }

  protected drop(event: CdkDragDrop<Card[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  protected getCardStyles(
    card: Card,
    picture: string,
    resultHeight: string,
  ): {
    width: string;
    backgroundImage: string;
    backgroundSize: string;
    backgroundPosition: string;
    backgroundRepeat: string;
  } {
    return {
      width: card.width,
      backgroundImage: `url(${picture})`,
      backgroundSize: `700px ${resultHeight}`,
      backgroundPosition: `-${String(card.xOffset)}px -${String(card.yOffset)}px`,
      backgroundRepeat: 'no-repeat',
    };
  }
}
