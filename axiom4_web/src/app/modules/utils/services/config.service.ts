import { Injectable } from '@angular/core';
import { Configuration } from '../models/configuration';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Configuration | undefined;
  constructor() { }

  configLoad(): Observable<Configuration> {
    this.config = environment
    return of(this.config);
  }

  getConfiguration(): Configuration | undefined {
    return this.config;
  }
}
