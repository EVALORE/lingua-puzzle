import { LevelData, Round, Word, WordCollection } from './http-data.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpDataService {
  private readonly httpClient = inject(HttpClient);

  private readonly currentDifficultyLevel = 1;
  private readonly url = `http://localhost:4200/project-data/data/wordCollectionLevel${this.currentDifficultyLevel.toString()}.json`;

  public round!: LevelData;
  public words!: Word[];

  private getData(): Observable<WordCollection> {
    return this.httpClient.get<WordCollection>(this.url);
  }

  public getRound(roundIndex: number): Observable<Round> {
    return this.getData().pipe(map((collection) => collection.rounds[roundIndex]));
  }
}
