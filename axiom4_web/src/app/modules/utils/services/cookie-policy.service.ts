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
  }

  close() {
    this.cookiePolicyAlert = undefined;
    this.loadScript();
    localStorage.removeItem('cookie-policy');
    localStorage.setItem('cookie-policy', 'accept');
  }
}
