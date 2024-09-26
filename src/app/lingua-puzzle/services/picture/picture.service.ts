import { Injectable, signal } from '@angular/core';
import { Picture } from '../../../shared/types/http-data.interface';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  public readonly picture = signal({} as Picture);

  public setPicture(picture: Picture): void {
    this.picture.set(picture);
  }

  public get src(): string {
    return `project-data/images/${this.picture().imageSrc}`;
  }
}
