import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Configuration } from '../models/configuration';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config: Configuration | undefined;

  configLoad(): Observable<Configuration> {
    this.config = environment;
    return of(this.config);
  }

  getConfiguration(): Configuration | undefined {
    return this.config;
  }
}
