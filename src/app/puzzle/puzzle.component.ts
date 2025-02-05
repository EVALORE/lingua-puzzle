import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameService } from './services/game/game.service';
import { RoundService } from './services/round/round.service';
import { HttpDataService } from './services/http-data/http-data.service';
import { LevelService } from './services/level/level.service';
import { CardService } from './services/card/card.service';
import { GameComponent } from './components/game/game.component';
import { PuzzleService } from './services/puzzle/puzzle.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-puzzle',
  imports: [
    GameComponent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './puzzle.component.html',
  providers: [GameService, LevelService, RoundService, HttpDataService, CardService, PuzzleService],
  styleUrl: './puzzle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PuzzleComponent {
  private readonly puzzleService = inject(PuzzleService);

  protected levelsSelect = new FormControl(1, { nonNullable: true });
  protected roundsSelect = new FormControl(0, { nonNullable: true });

  protected levels = [1, 2, 3, 4, 5, 6];
  protected rounds = this.puzzleService.roundCount$.pipe(
    map((roundsCount) => Array.from({ length: roundsCount }, (_, index) => index)),
  );

  constructor() {
    this.puzzleService.round$.subscribe(console.log);
  }

  protected changeCurrentLevel(levelNumber: number): void {
    this.puzzleService.setLevelNumber(levelNumber);
  }

  protected changeCurrentRound(roundIndex: number): void {
    this.puzzleService.setRoundIndex(roundIndex);
  }
}
