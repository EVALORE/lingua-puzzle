import { Round, WordCollection } from '../../shared/types/http-data.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LevelService } from '../../lingua-puzzle/services/level.service';

@Injectable({
  providedIn: 'root',
})
export class HttpDataService {
  private readonly httpClient = inject(HttpClient);
  private readonly levelService = inject(LevelService);

  private getData(): Observable<WordCollection> {
    return this.httpClient.get<WordCollection>(this.levelService.levelUrl);
  }

  public getRound(roundIndex: number): Observable<Round> {
    return this.getData().pipe(map((collection) => collection.rounds[roundIndex]));
  }
}
