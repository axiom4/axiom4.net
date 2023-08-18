import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookiePolicyService } from './services/cookie-policy.service';
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    CookiePolicyComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  providers: [
    CookiePolicyService
  ],
  exports: [
    CookiePolicyComponent
  ]
})
export class UtilsModule { }
