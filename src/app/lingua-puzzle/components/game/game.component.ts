import {
  animate,
  AnimationTransitionMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { WordCardDirective } from '../../directives/word-card.directive';
import { Card, GameService } from '../../services/game.service';
import { MatButton } from '@angular/material/button';

function gapCollapseAnimation(): AnimationTransitionMetadata {
  return transition(':leave', [
    style({ opacity: 0 }),
    animate('600ms ease-in', style({ width: 0, padding: 0 })),
  ]);
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatCard, WordCardDirective, MatButton],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('filterAnimation', [gapCollapseAnimation()])],
})
export class GameComponent {
  private readonly gameService = inject(GameService);

  protected source = this.gameService.source;
  protected result = this.gameService.result;
  protected isWin = this.gameService.isWin;
  protected completedSentences: Card[][] = [];

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

  private pushSentenceToCompleted(): void {
    this.completedSentences.push(this.result());
  }
}
