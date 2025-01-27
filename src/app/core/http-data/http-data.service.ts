import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LevelResponse } from '../../shared/types/http-data';
import { Observable } from 'rxjs';

function levelFilename(levelIndex: number): string {
  return `wordCollectionLevel${String(levelIndex)}.json`;
}

const baseUrl = 'https://evalore.github.io/rss-puzzle-data';
const dataFolderUrl = `${baseUrl}/data`;
const audioFolderUrl = baseUrl;
const imagesFolderUrl = `${baseUrl}/images`;

@Injectable()
export class HttpDataService {
  private readonly httpClient = inject(HttpClient);

  public getLevel(levelIndex: number): Observable<LevelResponse> {
    return this.httpClient.get<LevelResponse>(`${dataFolderUrl}/${levelFilename(levelIndex)}`);
  }

  public getAudio(audioName: string): Observable<Blob> {
    return this.httpClient.get(`${audioFolderUrl}/${audioName}`, {
      responseType: 'blob',
    });
  }

  public getImage(imageName: string): Observable<Blob> {
    return this.httpClient.get(`${imagesFolderUrl}/${imageName}`, {
      responseType: 'blob',
    });
  }
}
