import { Injectable, inject } from '@angular/core';
import { CookiePolicy } from '../models/cooke-policy';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class CookiePolicyService {
  cookiePolicyAlert: CookiePolicy | undefined;

  private configService = inject(ConfigService);

  show(cookiePolicyAlert: CookiePolicy) {
    const cookiePolicy = localStorage.getItem('cookie-policy');

    if (cookiePolicy !== 'accept') {
      this.cookiePolicyAlert = cookiePolicyAlert;

      if (cookiePolicyAlert.timeout > 0) {
        setTimeout(() => this.close(), cookiePolicyAlert.timeout);
      }
    } else {
      this.loadScript();
    }
  }

  loadScript() {
    // Google Tag Manager loading disabled
  }

  close() {
    this.cookiePolicyAlert = undefined;
    localStorage.setItem('cookie-policy', 'accept');
    this.loadScript();
  }
}
