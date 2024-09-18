import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatCard } from '@angular/material/card';
import { WordCardDirective } from '../../directives/word-card.directive';

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
  protected sentenceLength = this.gameService.charInSentence;

  protected source = this.gameService.source;
  protected result = this.gameService.result;

  public moveToSource(wordIndex: number): void {
    this.gameService.moveToSource(wordIndex);
  }

  public moveToResult(wordIndex: number): void {
    this.gameService.moveToResult(wordIndex);
  }
}
