import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ConfigService } from './modules/utils';
import { ApiModule, Configuration, ConfigurationParameters } from './modules/core/api/v1';
import { routes } from './app.routes';

let config: ConfigService;

export function ConfigLoader(configService: ConfigService) {
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    importProvidersFrom(ApiModule.forRoot(apiConfigFactory)),
    provideAppInitializer(() => {
        const initializerFn = ConfigLoader(inject(ConfigService));
        return initializerFn();
      }),
  ]
};
