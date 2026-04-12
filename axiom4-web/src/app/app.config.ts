import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';
import { routes } from './app.routes';
import {
  ApiModule,
  Configuration,
  ConfigurationParameters,
} from './modules/core/api/v1';
import { ConfigService } from './modules/utils';

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
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
    ),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    importProvidersFrom(ApiModule.forRoot(apiConfigFactory)),
    provideAppInitializer(() => {
      const initializerFn = ConfigLoader(inject(ConfigService));
      return initializerFn();
    }),
  ],
};
