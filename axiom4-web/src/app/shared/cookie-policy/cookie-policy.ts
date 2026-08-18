import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CookiePolicyService } from '../services/cookie-policy';


@Component({
    selector: 'app-cookie-policy',
    templateUrl: './cookie-policy.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class CookiePolicyComponent {
  constructor(public cookiePolicyService: CookiePolicyService) { }

}
