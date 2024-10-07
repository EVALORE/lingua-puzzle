import { Injectable, inject, signal } from '@angular/core';

import { RoundService } from '../round/round.service';
import { Picture } from '../../../shared/types/http-data.interface';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  private readonly roundService = inject(RoundService);
  public readonly picture = signal({} as Picture);

  constructor() {
    this.roundService.round.subscribe((round) => {
      this.picture.set(round.levelData);
    });
  }

  public get src(): string {
    return this.picture().imageSrc
      ? `https://evalore.github.io/rss-puzzle-data/images/${this.picture().imageSrc}`
      : '';
  }
}
