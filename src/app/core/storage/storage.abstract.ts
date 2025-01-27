export class StorageService<T extends object> {
  constructor(
    private readonly storage: Storage,
    private readonly prefix?: string,
  ) {}

  public get length(): number {
    return this.storage.length;
  }

  public getItem<K extends keyof T>(key: K): T[K];
  public getItem<K extends keyof T>(key: K, defaultValue?: T[K]): T[K] | null {
    const item = this.storage.getItem(this.createKey(key));
    return item === null ? (defaultValue ?? null) : (JSON.parse(item) as T[K]);
  }

  public setItem(key: string, value: string): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }

  public key(index: number): string | null {
    return this.storage.key(index);
  }

  private createKey(key: keyof T): string {
    const prefix = this.prefix ? `${this.prefix}-` : '';
    return `${prefix}${key.toString()}`;
  }
}
