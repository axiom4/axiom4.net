import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookiePolicyService } from './services/cookie-policy.service';
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        CookiePolicyComponent
    ],
    providers: [
        CookiePolicyService
    ],
    exports: [
        CookiePolicyComponent
    ]
})
export class UtilsModule { }
