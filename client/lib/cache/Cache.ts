import LocalStorage from "./storages/LocalStorage";

class Cache {
  storage: LocalStorage;
  constructor(storage: LocalStorage) {
    this.storage = storage;
  }

  write(key: string, data: any): void {
    this.storage.write(key, data);
  }

  read(key: string): any {
    return this.storage.read(key);
  }

  contains(key: string): boolean {
    return this.storage.contains(key);
  }
}

export default Cache;
