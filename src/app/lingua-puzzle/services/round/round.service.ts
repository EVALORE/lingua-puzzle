import { inject, Injectable, signal } from '@angular/core';
import { Round, Sentence } from '../../../shared/types/http-data.interface';
import { HttpDataService } from '../../../core/services/http-data.service';
import { PictureService } from '../picture/picture.service';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  private readonly pictureService = inject(PictureService);
  private readonly httpData = inject(HttpDataService);

  public rounds: Round[] = [];
  public roundIndex = 0;

  public sentence = signal({} as Sentence);

  constructor() {
    this.setRound();
  }

  public setRound(): void {
    this.httpData.getRounds().subscribe((rounds) => {
      this.rounds = rounds;
      this.pictureService.setPicture(rounds[this.roundIndex].levelData);
      this.sentence.set(rounds[this.roundIndex].words[0]);
    });
  }
}
