import { environment } from '../../../environments/environment';

export function fullImagePath(path: string): string {
  return `${environment.imagesFolderUrl}/${path}`;
}
