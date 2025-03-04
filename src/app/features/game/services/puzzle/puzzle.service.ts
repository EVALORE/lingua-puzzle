import { computed, effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Tile } from '../../types/tile';
import { shuffle } from '../../utils/shuffle';
import { PositionStatus } from '../../enums/position-status';
import { WordEntry } from '../../types/http-data';
import { puzzleWidth } from '../../consts/ui-layout.const';
import { DEFAULT_WORD_INDEX } from '../../consts/default-values.const';

@Injectable()
export class PuzzleService {
  public readonly puzzleWords = signal<WordEntry[]>([]);
  public readonly word = computed(() => this.puzzleWords()[this.wordIndex()]);
  public readonly wordIndex = signal<number>(DEFAULT_WORD_INDEX);
  public readonly solvedTiles = signal<Tile[][]>([]);
  public readonly availableTiles = signal<Tile[]>([]);
  public readonly placedTiles = signal<Tile[]>([]);
  public readonly hints = computed(() => {
    const { sentenceTranslation, sentenceAudio } = this.word();
    return {
      translation: sentenceTranslation,
      audio: sentenceAudio,
    };
  });

  public hasNoAvailableTiles = computed(() => !this.availableTiles().length);
  public areTilesPlacedCorrectly = computed(() =>
    this.hasNoAvailableTiles()
      ? this.placedTiles().every((card) => card.positionStatus === PositionStatus.CORRECT)
      : false,
  );
  public isPuzzleSolved = computed(() => this.solvedTiles().length === this.puzzleWords().length);

  constructor() {
    effect(() => {
      const { sentence } = this.word();
      const tiles = this.createTilesFromSentence(sentence);

      this.clearPlacedTiles();
      this.availableTiles.set(shuffle(tiles));
    });
  }

  public newPuzzleWords(words: WordEntry[]): void {
    this.puzzleWords.set(words);
    this.clearAll();
  }

  public handleNextStep(): void {
    this.movePlacedToSolved();

    if (this.isPuzzleSolved()) {
      return;
    }

    this.nextWordIndex();
  }

  public autocompleteResult(): void {
    this.placedTiles.update(this.sortTilesByInitialIndex.bind(this));
    this.validatePlacedStatus();
  }

  public validatePlacedStatus(): void {
    this.placedTiles.update(this.updateTilesPositionStatus.bind(this));
  }

  public clearAll(): void {
    this.clearSolvedTiles();
    this.clearPlacedTiles();
    this.setWordIndex();
  }

  private clearSolvedTiles(): void {
    this.solvedTiles.set([]);
  }

  private clearPlacedTiles(): void {
    this.placedTiles.set([]);
  }

  public nextWordIndex(): void {
    this.setWordIndex(this.wordIndex() + 1);
  }

  public setWordIndex(sentenceIndex = DEFAULT_WORD_INDEX): void {
    this.wordIndex.set(sentenceIndex);
  }

  public movePlacedToSolved(): void {
    this.solvedTiles.update((completed) => [...completed, this.placedTiles()]);
    this.clearPlacedTiles();
  }

  public moveCardToResult(cardIndex: number): void {
    this.moveCard(cardIndex, this.availableTiles, this.placedTiles);
  }

  public moveCardToSource(cardIndex: number): void {
    this.placedTiles.update(this.resetTilesPositionStatus.bind(this));
    this.moveCard(cardIndex, this.placedTiles, this.availableTiles);
  }

  private moveCard(
    cardIndex: number,
    from: WritableSignal<Tile[]>,
    to: WritableSignal<Tile[]>,
  ): void {
    to.update((cards) => [...cards, from()[cardIndex]]);
    from.update((cards) => cards.filter((_, index) => index !== cardIndex));
  }

  public createTilesFromSentence(sentence: string): Tile[] {
    return sentence.split(' ').map(
      (word, index): Tile => ({
        word,
        width: this.calculateTileWidth(word, sentence),
        initialIndex: index,
        positionStatus: PositionStatus.PENDING,
      }),
    );
  }

  private calculateTileWidth(word: string, sentence: string): number {
    return (word.length / sentence.replace(/ /gu, '').length) * puzzleWidth.number;
  }

  private sortTilesByInitialIndex(tiles: Tile[]): Tile[] {
    return tiles.sort((a, b) => a.initialIndex - b.initialIndex);
  }

  private updateTilesPositionStatus(tiles: Tile[]): Tile[] {
    return tiles.map((tile, index) => ({
      ...tile,
      positionStatus: index === tile.initialIndex ? PositionStatus.CORRECT : PositionStatus.WRONG,
    }));
  }

  private resetTilesPositionStatus(tiles: Tile[]): Tile[] {
    return tiles.map((tile) => ({ ...tile, positionStatus: PositionStatus.PENDING }));
  }
}
