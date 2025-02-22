import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {GameLevel} from '../../types/http-data';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

function levelFilename(levelIndex: number): string {
  return `wordCollectionLevel${String(levelIndex)}.json`;
}


const {baseUrl} = environment;
console.log(baseUrl);
console.log(import.meta.env.NG_DATA_FOLDER_URL);
const dataFolderUrl = '';
const audioFolderUrl = baseUrl;
const imagesFolderUrl = `${baseUrl}/images`;

@Injectable()
export class HttpDataService {
  private readonly httpClient = inject(HttpClient);

  public getLevel(levelIndex: number): Observable<GameLevel> {
    return this.httpClient.get<GameLevel>(`${dataFolderUrl}/${levelFilename(levelIndex)}`);
  }

  public getAudio(audioName: string): Observable<Blob> {
    return this.httpClient.get(`${audioFolderUrl}/${audioName}`, {
      responseType: 'blob',
    });
  }

  public getAudioFullPath(audioName: string): string {
    return `${audioFolderUrl}/${audioName}`;
  }

  public getImage(imageName: string): Observable<Blob> {
    return this.httpClient.get(`${imagesFolderUrl}/${imageName}`, {
      responseType: 'blob',
    });
  }
}
