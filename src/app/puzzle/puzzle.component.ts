import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameService } from './services/game/game.service';
import { MatCard, MatCardContent } from '@angular/material/card';
import { RoundService } from './services/round/round.service';
import { HttpDataService } from './services/http-data/http-data.service';
import { LevelService } from './services/level/level.service';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { cardHeight, puzzleWidth } from './consts/ui-layout.const';
import { CardService } from './services/card/card.service';

const numberOfSentences = 10;

@Component({
  selector: 'app-puzzle',
  imports: [MatCard, AsyncPipe, MatCardContent],
  templateUrl: './puzzle.component.html',
  providers: [GameService, LevelService, RoundService, HttpDataService, CardService],
  styleUrl: './puzzle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PuzzleComponent {
  protected readonly cardHeight = cardHeight;
  private readonly gameService = inject(GameService);
  protected readonly source$ = this.gameService.source$;
  protected readonly result$ = this.gameService.result$;

  protected puzzleStyles = {
    width: puzzleWidth.px,
    height: `${String(cardHeight.number * numberOfSentences)}px`,
  };

  constructor() {
    this.gameService.sentence$.pipe(takeUntilDestroyed()).subscribe();
  }

  protected moveToSource(wordIndex: number): void {
    this.gameService.moveToSource(wordIndex);
  }

  protected moveToResult(wordIndex: number): void {
    this.gameService.moveToResult(wordIndex);
  }
}
