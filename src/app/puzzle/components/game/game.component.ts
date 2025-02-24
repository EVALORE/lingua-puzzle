import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { MatCard } from '@angular/material/card';
import { cardHeight, puzzleWidth } from '../../consts/ui-layout.const';
import { GameService } from '../../services/game/game.service';
import { WordEntry } from '../../types/http-data';
import { MatButton } from '@angular/material/button';
import { HintsComponent } from '../hints/hints.component';
import { TilesComponent } from '../tiles/tiles.component';

@Component({
  selector: 'app-game',
  imports: [MatCard, MatButton, HintsComponent, TilesComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  private readonly gameService = inject(GameService);

  public readonly puzzleWords = input.required<WordEntry[]>();
  protected readonly puzzleSolved = output();

  protected readonly solvedTiles = this.gameService.solvedTiles;
  protected readonly availableTiles = this.gameService.availableTiles;
  protected readonly placedTiles = this.gameService.placedTiles;
  protected readonly hints = this.gameService.hints;
  protected readonly hasNoAvailableTiles = this.gameService.hasNoAvailableTiles;
  protected readonly areTilesPlacedCorrectly = this.gameService.areTilesPlacedCorrectly;
  private isPuzzleSolved = this.gameService.isPuzzleSolved;

  protected readonly boardStyles = computed(() => ({
    width: puzzleWidth.px,
    height: `${String(cardHeight.number * this.puzzleWords().length)}px`,
    overflow: 'hidden',
  }));

  constructor() {
    effect(() => {
      this.gameService.newPuzzleWords(this.puzzleWords());
    });

    afterRenderEffect(() => {
      if (this.isPuzzleSolved()) {
        this.puzzleSolved.emit();
      }
    });
  }

  protected handleNextStep(): void {
    this.gameService.handleNextStep();
  }

  protected checkCards(): void {
    this.gameService.validatePlacedStatus();
  }

  protected autocompleteSentenceSolving(): void {
    this.gameService.autocompleteResult();
  }

  protected moveCardToSource(index: number): void {
    this.gameService.moveCardToSource(index);
  }

  protected moveCardToResult(index: number): void {
    this.gameService.moveCardToResult(index);
  }
}
