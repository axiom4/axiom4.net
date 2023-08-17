import { Component } from '@angular/core';
import { CookiePolicyService } from '../../services/cookie-policy.service';

@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cookie-policy.component.html',
  styleUrls: ['./cookie-policy.component.scss']
})
export class CookiePolicyComponent {
  constructor(public cookiePolicyService: CookiePolicyService) { }
}
