import axios from 'axios';

export default class Http {
  private readonly http: any

  constructor() {
    this.http = axios.create({
      timeout: 1000,
      withCredentials: true,
    });
  }

  public async get(url: string): Promise<any> {
    return this.http.get(url);
  }

  public async post(url: string, data?: any): Promise<any> {
    return this.http.post(url, data);
  }

  public async put(url: string, data?: any): Promise<any> {
    return this.http.put(url, data);
  }

  public async delete(url: string, data?: any): Promise<any> {
    return this.http.delete(url, data);
  }
}
