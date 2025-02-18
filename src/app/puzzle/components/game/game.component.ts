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
import { Sentence } from '../../types/http-data';
import { MatButton } from '@angular/material/button';
import { CardListComponent } from '../card-list/card-list.component';
import { PositionStatus } from '../../enums/position-status';
import { HintsComponent } from '../hints/hints.component';
import { HttpDataService } from '../../services/http-data/http-data.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

interface BoardStyles {
  width: string;
  height: string;
}

@Component({
  selector: 'app-game',
  imports: [MatCard, MatButton, CardListComponent, HintsComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  private readonly gameService = inject(GameService);
  private readonly httpDataService = inject(HttpDataService);

  public sentences = input.required<Sentence[]>();
  protected puzzleSolved = output();

  private readonly sentence = computed(() => {
    const sentenceIndex = this.gameService.sentenceIndex();
    const sentences = this.sentences();

    return sentences[sentenceIndex];
  });

  protected readonly completedSentences = this.gameService.completedSentences;
  protected readonly source = this.gameService.source;
  protected readonly result = this.gameService.result;

  private numberOfSentences = computed(() => this.sentences().length);
  protected isSourceEmpty = computed(() => !this.source().length);
  protected isResultCorrect = computed(() =>
    this.result().every((card) => card.positionStatus === PositionStatus.CORRECT),
  );
  protected isSolved = computed(
    () => this.gameService.sentenceIndex() === this.numberOfSentences() - 1,
  );

  protected hints = computed(() => this.getHints(this.sentence()));

  private newGame$ = toObservable(this.sentences).pipe(
    takeUntilDestroyed(),
    tap(() => {
      this.gameService.clearAll();
    }),
  );

  constructor() {
    effect(() => {
      this.setSource(this.sentence().textExample);
    });

    this.newGame$.subscribe();
  }

  protected getHints(sentence: Sentence): { audio?: string; translation?: string } {
    return {
      audio: this.httpDataService.getAudioFullPath(sentence.audioExample),
      translation: sentence.textExampleTranslate,
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
    };
  }
}
