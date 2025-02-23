import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {GameLevel} from '../../types/http-data';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

function levelFilename(currentLevel: number): string {
  return `wordCollectionLevel${String(currentLevel)}.json`;
}

@Injectable()
export class HttpDataService {
  private readonly httpClient = inject(HttpClient);

  public getLevel(currentLevel: number): Observable<GameLevel> {
    return this.httpClient.get<GameLevel>(`${environment.levelsFolderUrl}/${levelFilename(currentLevel)}`);
  }

  public getAudioFullPath(audioName: string): string {
    return `${environment.audioFolderUrl}/${audioName}`;
  }

  public getImage(imageName: string): Observable<Blob> {
    return this.httpClient.get(`${environment.imagesFolderUrl}/${imageName}`, {
      responseType: 'blob',
    });
  }
}
