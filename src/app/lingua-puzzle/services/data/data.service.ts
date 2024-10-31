import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Level } from '../../../shared/types/http-data.interface';
import { HttpDataService } from '../../../core/services/http-data.service';
import { HttpClient } from '@angular/common/http';
import { apiPath } from '../../api-path.const';

@Injectable()
export class DataService {
  private readonly httpDataService = inject(HttpDataService);

  public getLevelData(levelNumber: number): Observable<Level> {
    return this.httpDataService.getLevelData(levelNumber).pipe(map((level) => {}));
  }

  private extendApiPath(path: string): string {
    return `${apiPath}/${path}`;
  }
}
