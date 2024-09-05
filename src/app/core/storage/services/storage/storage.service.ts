import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class StorageService implements Storage {
  protected constructor(
    private readonly api: Storage,
    private readonly prefix: string,
  ) {}

  public get length(): number {
    return this.api.length;
  }

  public key(index: number): string | null {
    return this.api.key(index);
  }

  public clear(): void {
    this.api.clear();
  }

  public removeItem(key: string): void {
    this.api.removeItem(this.prefixKey(key));
  }

  public setItem(key: string, value: unknown): void {
    this.api.setItem(this.prefixKey(key), JSON.stringify(value));
  }

  public getItem<T>(key: string, otherwise?: T): T | null {
    const item: string | null = this.api.getItem(this.prefixKey(key));

    if (item !== null) {
      return JSON.parse(item) as T;
    }

    if (otherwise) {
      return otherwise;
    }

    return null;
  }

  private prefixKey(key: string): string {
    return this.prefix ? `${this.prefix}.${key}` : key;
  }
}
