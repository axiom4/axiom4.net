import { Injectable, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/modules/utils/services/config.service';
import { CookiePolicy } from '../models/cooke-policy';

@Injectable()
export class CookiePolicyService implements OnInit {
  cookiePolicyAlert: CookiePolicy | undefined
  googleTag: string | undefined;

  constructor(
    private configService: ConfigService) {
  }

  ngOnInit(): void { }

  show(cookiePolicyAlert: CookiePolicy) {
    const cookiePolicy = localStorage.getItem('cookie-policy');

    if (cookiePolicy !== 'accept') {
      this.cookiePolicyAlert = cookiePolicyAlert;

      if (cookiePolicyAlert.timeout > 0) {
        const that = this;
        setTimeout(function () {
          that.close();
        }, cookiePolicyAlert.timeout);
      }
    } else {
      this.loadScript();
    }
  }

  loadScript() {
    this.googleTag = this.configService.getConfiguration()?.googleTag

    let gaScript = document.createElement('script');
    gaScript.setAttribute('async', 'true');
    gaScript.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${this.googleTag}&ngsw-bypass=true`);

    let gaScript2 = document.createElement('script');
    gaScript2.innerText = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'${this.googleTag}\');`;
    const head = <HTMLHeadElement>document.head;

    head.appendChild(gaScript);
    head.appendChild(gaScript2);
  }

  close() {
    this.cookiePolicyAlert = undefined;
    this.loadScript();
    localStorage.removeItem('cookie-policy');
    localStorage.setItem('cookie-policy', 'accept');
  }
}
