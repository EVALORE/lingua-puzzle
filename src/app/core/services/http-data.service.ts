import { Level } from '../../shared/types/http-data.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseLevelUrl = 'https://evalore.github.io/rss-puzzle-data/data/wordCollectionLevel';
const baseImageUrl = 'https://evalore.github.io/rss-puzzle-data/images';
const baseAudioUrl = 'https://evalore.github.io/rss-puzzle-data';

@Injectable({
  providedIn: 'root',
})
export class HttpDataService {
  private readonly httpClient = inject(HttpClient);

  public getLevel(levelNumber: number): Observable<Level> {
    return this.httpClient.get<Level>(this.getLevelUrl(levelNumber));
  }

  public getImage(imagePath: string): string {
    return this.getImageUrl(imagePath);
  }

  public getAudio(audioPath: string): string {
    return this.getAudioUrl(audioPath);
  }

  private getLevelUrl(levelNumber: number): string {
    return `${baseLevelUrl}/${String(levelNumber)}.json`;
  }

  private getImageUrl(imagePath: string): string {
    return `${baseImageUrl}/${imagePath}`;
  }

  private getAudioUrl(audioPath: string): string {
    return `${baseAudioUrl}/${audioPath}`;
  }
}
