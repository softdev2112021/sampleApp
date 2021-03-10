import LocalStorage from './storages/LocalStorage';

const storage = new LocalStorage();

class Cache {
	write(key: string, data: any) {
		storage.write(key, data);
	}
	read(key: string): any {
		return storage.read(key);
	}
	contains(key: string): boolean {
		return storage.contains(key);
	}
}

export default Cache;