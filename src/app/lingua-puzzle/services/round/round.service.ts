import { inject, Injectable } from '@angular/core';
import { Round } from '../../../shared/types/http-data.interface';
import { HttpDataService } from '../../../core/services/http-data.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  private readonly httpData = inject(HttpDataService);

  public rounds: Round[] = [];
  public round = new Subject<Round>();
  public roundIndex = 0;

  constructor() {
    this.httpData.getRounds().subscribe((rounds) => {
      this.rounds = rounds;
      this.roundIndex = 0;
      this.round.next(rounds[this.roundIndex]);
    });
  }

  public setRound(): void {
    this.round.next(this.rounds[this.roundIndex]);
  }
  public nextRound(): void {
    this.roundIndex += 1;
    this.setRound();
  }
}
