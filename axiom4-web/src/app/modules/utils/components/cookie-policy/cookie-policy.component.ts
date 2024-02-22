import { Component } from '@angular/core';
import { CookiePolicyService } from '../../services/cookie-policy.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cookie-policy.component.html',
  standalone: true,
  imports: [NgIf]
})
export class CookiePolicyComponent {
  constructor(public cookiePolicyService: CookiePolicyService) { }

}
