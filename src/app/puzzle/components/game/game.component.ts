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
import { cardHeight, puzzleWidth } from '../../consts/ui-layout.const';
import { GameService } from '../../services/game/game.service';
import { WordEntry } from '../../types/http-data';
import { MatButton } from '@angular/material/button';
import { PositionStatus } from '../../enums/position-status';
import { HintsComponent } from '../hints/hints.component';
import { HttpDataService } from '../../services/http-data/http-data.service';
import { TilesComponent } from '../tiles/tiles.component';

interface BoardStyles {
  width: string;
  height: string;
  overflow: string;
}

@Component({
  selector: 'app-game',
  imports: [MatCard, MatButton, HintsComponent, TilesComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  private readonly gameService = inject(GameService);
  private readonly httpDataService = inject(HttpDataService);

  public readonly words = input.required<WordEntry[]>();
  protected readonly puzzleSolved = output();

  private readonly word = computed(() => {
    const wordIndex = this.gameService.wordIndex();
    return this.words()[wordIndex];
  });

  protected readonly solvedTiles = this.gameService.assembledSentences;
  protected readonly source = this.gameService.source;
  protected readonly result = this.gameService.result;

  private numberOfSentences = computed(() => this.words().length);
  protected isSourceEmpty = computed(() => !this.source().length);
  protected isResultCorrect = computed(() =>
    this.result().every((card) => card.positionStatus === PositionStatus.CORRECT),
  );
  protected isSolved = computed(
    () => this.gameService.wordIndex() === this.numberOfSentences() - 1,
  );

  protected hints = computed(() => this.getHints(this.word()));

  constructor() {
    this.initializeGameEffects();
  }

  private initializeGameEffects(): void {
    this.initializeSentencesEffect();
    this.initializeSourceEffect();
  }

  private initializeSentencesEffect(): void {
    effect(() => {
      this.words();
      this.gameService.clearAll();
    });
  }

  private initializeSourceEffect(): void {
    effect(() => {
      this.setSource(this.word().sentence);
    });
  }

  protected getHints(word: WordEntry): { audio?: string; translation?: string } {
    return {
      audio: this.httpDataService.getAudioFullPath(word.sentenceAudio),
      translation: word.sentenceTranslation,
    };
  }

  protected handleNextStep(): void {
    this.gameService.moveResultToCompleted();

    if (this.isSolved()) {
      this.puzzleSolved.emit();
      return;
    }

    this.nextSentence();
  }

  private nextSentence(): void {
    this.gameService.nextSentenceIndex();
  }

  protected setSource(text: string): void {
    this.gameService.setSource(text);
  }

  protected checkCards(): void {
    this.gameService.updateResultPositionStatus();
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

  protected getBoardStyles(): BoardStyles {
    return {
      width: puzzleWidth.px,
      height: `${String(cardHeight.number * this.numberOfSentences())}px`,
      overflow: 'hidden',
    };
  }
}
