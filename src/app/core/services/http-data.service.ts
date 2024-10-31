import { LevelResponse } from '../../shared/types/http-data.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiPath } from '../../lingua-puzzle/api-path.const';

export interface ImagesQuality {
  highQuality: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpDataService {
  private readonly httpClient = inject(HttpClient);

  public getLevelData(levelNumber: number): Observable<LevelResponse> {
    return this.httpClient.get<LevelResponse>(
      `${apiPath}/data/wordCollectionLevel${String(levelNumber)}.json`,
    );
  }
}
