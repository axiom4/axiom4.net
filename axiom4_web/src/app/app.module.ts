import { APP_INITIALIZER, NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MainModule } from './modules/main/main.module';
import { UtilsModule } from './modules/utils/utils.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ConfigService } from './modules/utils';
import { ConfigurationParameters, Configuration, ApiModule } from './modules/core/api/v1';
import { MarkdownModule } from 'ngx-markdown';

var config: ConfigService;

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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ApiModule.forRoot(apiConfigFactory),
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MainModule,
    UtilsModule,
    NgbModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    }
  ], bootstrap: [AppComponent]
})
export class AppModule { }
