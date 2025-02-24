import { environment } from '../../../environments/environment';

export function fullAudioPath(audioName: string): string {
  return `${environment.audioFolderUrl}/${audioName}`;
}
