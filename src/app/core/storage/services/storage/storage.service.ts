export abstract class StorageService<T extends object> {
  constructor(
    private readonly storage: Storage,
    private readonly prefix?: string,
  ) {}

  public get length(): number {
    return this.storage.length;
  }

  public getItem<K extends keyof T>(key: K): T[K] | null;
  public getItem<K extends keyof T>(key: K, defaultValue: T[K]): T[K];
  public getItem<K extends keyof T>(key: K, defaultValue?: T[K]): T[K] | null {
    const savedValue = this.storage.getItem(this.createKey(key));
    return savedValue === null ? (defaultValue ?? null) : (JSON.parse(savedValue) as T[K]);
  }

  public setItem<K extends keyof T>(key: K, item: T[K]): void {
    this.storage.setItem(this.createKey(key), JSON.stringify(item));
  }

  public removeItem(key: keyof T): void {
    this.storage.removeItem(key.toString());
  }

  public clear(): void {
    this.storage.clear();
  }

  public key(index: number): string | null {
    return this.storage.key(index);
  }

  private createKey(key: keyof T): string {
    const prefix = this.prefix ? `${this.prefix}-` : '';
    return `${prefix}-${key.toString()}`;
  }
}
