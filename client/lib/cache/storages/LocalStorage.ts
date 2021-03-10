class LocalStorage {
	write(key: string, data: any): void {
		localStorage.setItem(key, JSON.stringify(data));
	}
	read(key: string): any {
		return JSON.parse(localStorage.getItem(key));
	}
	contains(key: string): boolean {
		return this.read(key) || false;
	}
}

export default LocalStorage;