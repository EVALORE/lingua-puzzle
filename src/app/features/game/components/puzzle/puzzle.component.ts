import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { MatCard } from '@angular/material/card';
import { boardWidth, tileHeight } from '../../consts/ui-layout.const';
import { PuzzleService } from '../../services/puzzle/puzzle.service';
import { Puzzle } from '../../types/http-data';
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

  public readonly puzzle = input.required<Puzzle>();
  protected readonly puzzleSolved = output();

  protected readonly word = this.puzzleService.word;
  protected readonly solvedTiles = this.puzzleService.solvedTiles;
  protected readonly availableTiles = this.puzzleService.availableTiles;
  protected readonly placedTiles = this.puzzleService.placedTiles;
  protected readonly hasNoAvailableTiles = this.puzzleService.hasNoAvailableTiles;
  protected readonly areTilesPlacedCorrectly = this.puzzleService.areTilesPlacedCorrectly;
  private isPuzzleSolved = this.puzzleService.isPuzzleSolved;

  protected readonly showButtons = computed(
    () => this.hasNoAvailableTiles() && !this.isPuzzleSolved(),
  );

  protected readonly boardStyles = computed(() => ({
    width: boardWidth.px,
    height: `${String(tileHeight.number * this.puzzle().words.length)}px`,
    overflow: 'hidden',
  }));

  protected readonly tileBackground = computed(() => {
    const { fullImageSrc } = this.puzzle().artwork;
    return {
      url: fullImageSrc,
      size: `${this.boardStyles().width} ${this.boardStyles().height}`,
    };
  });

  constructor() {
    effect(() => {
      this.puzzleService.newPuzzleWords(this.puzzle().words);
    });

    effect(() => {
      if (this.isPuzzleSolved()) {
        this.puzzleSolved.emit();
      }
    });
  }

  protected continue(): void {
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
