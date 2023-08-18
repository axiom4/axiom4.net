import { Component, OnInit } from '@angular/core';
import { ConfigService, CookiePolicy, CookiePolicyService } from './modules/utils';
import { BlogService } from './modules/core/api/v1';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private configService: ConfigService, public cookiePolicyService: CookiePolicyService) { }

  ngOnInit(): void {
    this.showCookiePolicyAlert();
  }

  showCookiePolicyAlert() {
    var alert: CookiePolicy = {
      title: 'Cookie Policy!',
      message: 'This site uses cookies. By continuing to visit this site you agree to our use of cookies.',
      submessage: 'More about <a href=\'/pages/cookies\'>cookies</a>' +
        ' or <a href =\'/pages/privacy\'>privacy</a> policies on <strong>AXIOM4.net</strong>',
      class: 'alert-bottom',
      timeout: 0
    }

    this.cookiePolicyService.show(alert);
  }


}
