import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PuzzleService } from './services/puzzle/puzzle.service';
import { HttpDataService } from './services/http-data/http-data.service';
import { GameService } from './services/game/game.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { PuzzleSelectorComponent } from './components/puzzle-selector/puzzle-selector.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';
import { ModalService } from '../core/services/modal/modal.service';
import { ResultComponent } from './components/result/result.component';
import { Puzzle } from './types/http-data';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-game',
  imports: [ReactiveFormsModule, AsyncPipe, PuzzleSelectorComponent, PuzzleComponent, MatButton],
  templateUrl: './game.component.html',
  providers: [PuzzleService, HttpDataService, GameService],
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'width: 800px',
  },
})
export class GameComponent {
  private readonly gameService = inject(GameService);
  private readonly modalService = inject(ModalService);

  protected readonly isPuzzleSolved = signal(false);

  protected readonly puzzle$ = this.gameService.puzzle$;
  protected readonly gameState$ = this.gameService.gameState$;

  protected showStatisticsModal(puzzle: Puzzle): void {
    this.modalService.openModal({
      component: ResultComponent,
      title: 'statistics',
      inputs: { puzzle },
      actions: {
        continue: () => {
          this.nextRound();
          this.modalService.closeModal();
        },
        close: () => {
          this.modalService.closeModal();
        },
      },
    });
  }

  protected puzzleSolved(): void {
    this.isPuzzleSolved.set(true);
  }

  protected nextRound(): void {
    this.isPuzzleSolved.set(false);
    this.gameService.nextPuzzle();
  }

  protected levelChange(level: number): void {
    this.isPuzzleSolved.set(false);
    this.gameService.setLevelNumber(level);
  }

  protected roundChange(round: number): void {
    this.isPuzzleSolved.set(false);
    this.gameService.setPuzzleIndex(round);
  }
}
