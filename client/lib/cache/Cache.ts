class Cache {
  storage: any;
  constructor(storage) {
    this.storage = storage;
  }

  write(key: string, data: any) {
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
