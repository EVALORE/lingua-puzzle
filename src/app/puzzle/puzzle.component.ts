import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameService } from './services/game/game.service';
import { RoundService } from './services/round/round.service';
import { HttpDataService } from './services/http-data/http-data.service';
import { LevelService } from './services/level/level.service';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardService } from './services/card/card.service';
import { MatButton } from '@angular/material/button';
import { GameComponent } from './components/game/game.component';
import { LevelRoundDropdownComponent } from './components/level-round-dropdown/level-round-dropdown.component';
import { LevelInformation } from './types/level-information';

@Component({
  selector: 'app-puzzle',
  imports: [AsyncPipe, MatButton, GameComponent, LevelRoundDropdownComponent],
  templateUrl: './puzzle.component.html',
  providers: [GameService, LevelService, RoundService, HttpDataService, CardService],
  styleUrl: './puzzle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PuzzleComponent {
  private readonly gameService = inject(GameService);
  protected readonly isSourceEmpty$ = this.gameService.isSourceEmpty$;

  protected levelsList: LevelInformation[] = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
  ];

  constructor() {
    this.gameService.sentence$.pipe(takeUntilDestroyed()).subscribe();
  }
}
