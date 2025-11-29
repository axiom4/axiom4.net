import {
  NgModule,
  isDevMode,
  inject,
  provideAppInitializer,
} from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MainModule } from './modules/main/main.module';
import { UtilsModule } from './modules/utils/utils.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ConfigService } from './modules/utils';
import {
  ConfigurationParameters,
  Configuration,
  ApiModule,
} from './modules/core/api/v1';

let config: ConfigService;

export function ConfigLoader(configService: ConfigService) {
  // Note: this factory need to return a function (that return a promise)
  return () => {
    config = configService;
    return config.configLoad();
  };
}

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: config.getConfiguration()?.service_url,
  };
  return new Configuration(params);
}

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    ApiModule.forRoot(apiConfigFactory),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MainModule,
    UtilsModule,
    NgbModule,
  ],
  providers: [
    ConfigService,
    provideAppInitializer(() => {
      const initializerFn = ConfigLoader(inject(ConfigService));
      return initializerFn();
    }),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
  ],
})
export class AppModule {}
