import { Injectable, inject } from '@angular/core';
import { ConfigService } from 'src/app/modules/utils/services/config.service';
import { CookiePolicy } from '../models/cooke-policy';

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
