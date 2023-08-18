import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '../models/configuration';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Configuration | undefined;
  constructor() { }

  configLoad() {
    this.config = environment
    // this.http.get<Configuration>(url)
    //   .subscribe(config => {
    //     this.config = config;
    //     resolve();
    //   });
  }

  getConfiguration(): Configuration | undefined {
    return this.config;
  }
}
