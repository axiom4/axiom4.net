import { Injectable, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/modules/utils/services/config.service';
import { CookiePolicy } from '../models/cooke-policy';

@Injectable()
export class CookiePolicyService implements OnInit {
  cookiePolicyAlert: CookiePolicy | undefined
  analiticsID: string | undefined;

  constructor(
    private configService: ConfigService) {
  }

  ngOnInit(): void {
    // this.analiticsID = this.configService.getConfiguration()?.axiom4_blog_google_analitics_id;
    console.log(this.analiticsID)
  }

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
    // const head = <HTMLHeadElement>document.head;
    // const script = document.createElement('script');
    // script.innerHTML = '(function (i, s, o, g, r, a, m) {' +
    //   'i[\'GoogleAnalyticsObject\'] = r; i[r] = i[r] || function () {' +
    //   '(i[r].q = i[r].q || []).push(arguments)' +
    //   '}, i[r].l = 1 * new Date(); a = s.createElement(o),' +
    //   'm = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)' +
    //   '})(window, document, \'script\', \'//www.google-analytics.com/analytics.js\', \'ga\');' +
    //   'ga(\'create\', \'' + this.analiticsID + '\', \'axiom4.net\');' +
    //   'ga(\'require\', \'displayfeatures\');' +
    //   'ga(\'send\', \'pageview\');';
    // // script.src = 'url';
    // script.async = true;
    // script.defer = true;
    // head.appendChild(script);
  }

  close() {
    this.cookiePolicyAlert = undefined;
    this.loadScript();
    localStorage.removeItem('cookie-policy');
    localStorage.setItem('cookie-policy', 'accept');
  }
}
