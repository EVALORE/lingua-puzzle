import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { cardHeight, puzzleWidth } from '../../consts/ui-layout.const';
import { GameService } from '../../services/game/game.service';
import { Card } from '../../types/card';

const numberOfSentences = 10;

interface CardStyles {
  width: string;
  height: string;
}

interface BoardStyles {
  width: string;
  height: string;
}

@Component({
  selector: 'app-game',
  imports: [AsyncPipe, MatCard, MatCardContent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  private readonly gameService = inject(GameService);

  public round = input.required<string>();

  protected readonly source$ = this.gameService.source$;
  protected readonly result$ = this.gameService.result$;

  constructor() {
    effect(() => {
      this.gameService.setSource(this.round());
    });
  }

  protected getBoardStyles(): BoardStyles {
    return {
      width: puzzleWidth.px,
      height: `${String(cardHeight.number * numberOfSentences)}px`,
    };
  }

  protected getCardStyles({ width }: Card): CardStyles {
    return {
      width: `${String(width)}px`,
      height: cardHeight.px,
    };
  }

  protected moveToResult(cardIndex: number): void {
    this.gameService.moveCard(cardIndex, this.source$, this.result$);
  }

  protected moveToSource(cardIndex: number): void {
    this.gameService.moveCard(cardIndex, this.result$, this.source$);
  }
}
