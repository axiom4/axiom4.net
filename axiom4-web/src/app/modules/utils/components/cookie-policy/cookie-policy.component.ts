import { Component, OnInit } from '@angular/core';
import { CookiePolicyService } from '../../services/cookie-policy.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-cookie-policy',
    templateUrl: './cookie-policy.component.html',
    styleUrls: ['./cookie-policy.component.scss'],
    standalone: true,
    imports: [NgIf]
})
export class CookiePolicyComponent implements OnInit {
  constructor(public cookiePolicyService: CookiePolicyService) { }
  ngOnInit(): void {
  }
}
