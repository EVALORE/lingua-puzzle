import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-game',
  imports: [ReactiveFormsModule, AsyncPipe, PuzzleSelectorComponent, PuzzleComponent],
  templateUrl: './game.component.html',
  providers: [PuzzleService, HttpDataService, GameService],
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  private readonly gameService = inject(GameService);
  private readonly modalService = inject(ModalService);

  protected puzzle$ = this.gameService.puzzle$;
  protected gameState$ = this.gameService.gameState$;

  protected openModal(puzzle: Puzzle): void {
    this.modalService.openModal({
      component: ResultComponent,
      inputs: { puzzle },
    });
  }

  protected nextRound(): void {
    this.gameService.nextPuzzle();
  }

  protected levelChange(level: number): void {
    this.gameService.setLevelNumber(level);
  }

  protected roundChange(round: number): void {
    this.gameService.setPuzzleIndex(round);
  }
}
