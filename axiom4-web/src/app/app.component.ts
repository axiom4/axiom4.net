import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './modules/main/components/header/header.component';
import { FooterComponent } from './modules/main/components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, HeaderComponent, FooterComponent],
})
export class AppComponent {}
