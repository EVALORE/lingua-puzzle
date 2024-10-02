import { effect, inject, Injectable } from '@angular/core';
import { Round } from '../../../shared/types/http-data.interface';
import { HttpDataService } from '../../../core/services/http-data.service';
import { Subject } from 'rxjs';
import { LevelService } from '../level/level.service';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  private readonly httpData = inject(HttpDataService);
  private readonly levelService = inject(LevelService);

  public rounds: Round[] = [];
  public round = new Subject<Round>();
  public roundIndex = 0;

  constructor() {
    effect(() => {
      this.levelService.currentLevel();
      this.httpData.getRounds().subscribe((rounds) => {
        this.rounds = rounds;
        this.setRound(0);
      });
    });
  }

  public setRound(roundIndex: number): void {
    this.roundIndex = roundIndex;
    this.round.next(this.rounds[roundIndex]);
  }
  public nextRound(): void {
    if (this.roundIndex < this.rounds.length - 1) {
      this.setRound(this.roundIndex + 1);
    }
  }
}
