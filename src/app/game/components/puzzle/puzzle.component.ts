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
import { PuzzleService } from '../../services/puzzle/puzzle.service';
import { WordEntry } from '../../types/http-data';
import { MatButton } from '@angular/material/button';
import { HintsComponent } from '../hints/hints.component';
import { TilesComponent } from '../tiles/tiles.component';

@Component({
  selector: 'app-puzzle',
  imports: [MatCard, MatButton, HintsComponent, TilesComponent],
  templateUrl: './puzzle.component.html',
  styleUrl: './puzzle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PuzzleComponent {
  private readonly puzzleService = inject(PuzzleService);

  public readonly puzzleWords = input.required<WordEntry[]>();
  protected readonly puzzleSolved = output();

  protected readonly solvedTiles = this.puzzleService.solvedTiles;
  protected readonly availableTiles = this.puzzleService.availableTiles;
  protected readonly placedTiles = this.puzzleService.placedTiles;
  protected readonly hints = this.puzzleService.hints;
  protected readonly hasNoAvailableTiles = this.puzzleService.hasNoAvailableTiles;
  protected readonly areTilesPlacedCorrectly = this.puzzleService.areTilesPlacedCorrectly;
  private isPuzzleSolved = this.puzzleService.isPuzzleSolved;

  protected readonly boardStyles = computed(() => ({
    width: puzzleWidth.px,
    height: `${String(cardHeight.number * this.puzzleWords().length)}px`,
    overflow: 'hidden',
  }));

  constructor() {
    effect(() => {
      this.puzzleService.newPuzzleWords(this.puzzleWords());
    });

    afterRenderEffect(() => {
      if (this.isPuzzleSolved()) {
        this.puzzleSolved.emit();
      }
    });
  }

  protected handleNextStep(): void {
    this.puzzleService.handleNextStep();
  }

  protected checkCards(): void {
    this.puzzleService.validatePlacedStatus();
  }

  protected autocompleteSentenceSolving(): void {
    this.puzzleService.autocompleteResult();
  }

  protected moveCardToSource(index: number): void {
    this.puzzleService.moveCardToSource(index);
  }

  protected moveCardToResult(index: number): void {
    this.puzzleService.moveCardToResult(index);
  }
}
