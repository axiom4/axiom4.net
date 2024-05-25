import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MainModule } from './modules/main/main.module';
import { UtilsModule } from './modules/utils/utils.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ConfigService } from './modules/utils';
import { ConfigurationParameters, Configuration, ApiModule } from './modules/core/api/v1';
import { ServiceWorkerModule } from '@angular/service-worker';

let config: ConfigService;

export function ConfigLoader(configService: ConfigService) {
  // Note: this factory need to return a function (that return a promise)
  return () => {
    config = configService
    return config.configLoad()
  };
}

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: config.getConfiguration()?.service_url,
  }
  return new Configuration(params);
}

@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [ApiModule.forRoot(apiConfigFactory),
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MainModule,
        UtilsModule,
        NgbModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })], providers: [
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: ConfigLoader,
            deps: [ConfigService],
            multi: true
        },
        provideClientHydration(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
