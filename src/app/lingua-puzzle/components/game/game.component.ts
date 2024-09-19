import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { WordCardDirective } from '../../directives/word-card.directive';
import { Card, GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatCard, WordCardDirective],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('filterAnimation', [
      transition(':leave', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ width: 0, padding: 0 })),
      ]),
    ]),
  ],
})
export class GameComponent {
  private readonly gameService = inject(GameService);

  protected source = this.gameService.source;
  protected result = this.gameService.result;
  protected completedSentences: Card[][] = [];

  protected isWin = this.gameService.isWin;

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

  protected pushSentenceToCompleted(): void {
    this.completedSentences.push(this.result());
  }
}
