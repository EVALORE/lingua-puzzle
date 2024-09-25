import {
  animate,
  AnimationTransitionMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MatButton } from '@angular/material/button';
import { HintsComponent } from '../hints/hints.component';
import { CardListComponent } from '../card-list/card-list.component';
import { PuzzleComponent } from '../puzzle/puzzle.component';

function gapCollapseAnimation(): AnimationTransitionMetadata {
  return transition(':leave', [
    style({ opacity: 0 }),
    animate('600ms ease-in', style({ width: 0, padding: 0 })),
  ]);
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatButton, HintsComponent, CardListComponent, PuzzleComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('filterAnimation', [gapCollapseAnimation()])],
})
export class GameComponent {
  private readonly gameService = inject(GameService);
  protected isWin = this.gameService.isWin;

  protected startResultAutoComplete(): void {
    this.gameService.sortCardsInCorrectOrder();
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
}
