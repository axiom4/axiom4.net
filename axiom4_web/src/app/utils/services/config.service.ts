import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '../models/configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Configuration | undefined;
  constructor(private http: HttpClient) { }

  configLoad(url: string) {
    return new Promise<void>((resolve) => {
      this.http.get<Configuration>(url)
        .subscribe(config => {
          this.config = config;
          resolve();
        });
    });
  }

  getConfiguration(): Configuration | undefined {
    return this.config;
  }
}
