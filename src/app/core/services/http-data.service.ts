import { Round, Level } from '../../shared/types/http-data.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LevelService } from '../../lingua-puzzle/services/level/level.service';

@Injectable({
  providedIn: 'root',
})
export class HttpDataService {
  private readonly httpClient = inject(HttpClient);
  private readonly levelService = inject(LevelService);

  private getData(): Observable<Level> {
    return this.httpClient.get<Level>(this.levelService.levelUrl);
  }

  public getRounds(): Observable<Round[]> {
    return this.getData().pipe(map((level) => level.rounds));
  }
}
