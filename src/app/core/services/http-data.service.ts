import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpDataService {
  private readonly httpClient = inject(HttpClient);

  private url =
    'https://github.com/rolling-scopes-school/rss-puzzle-data/blob/main/data/wordCollectionLevel1.json';

  public getData(): void {
    this.httpClient
      .get(this.url)
      .pipe()
      .subscribe((data) => {
        console.log(data);
      });
  }
}
