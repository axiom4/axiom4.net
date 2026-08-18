import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, startWith } from 'rxjs';
import { HeaderComponent } from './modules/main/components/header/header.component';
import { FooterComponent } from './modules/main/components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, HeaderComponent, FooterComponent],
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.updateSeoUrls());
  }

  private updateSeoUrls(): void {
    const path = this.router.url.split('#')[0].split('?')[0] || '/';
    const canonicalUrl = new URL(path, this.document.location.origin).toString();

    this.upsertLinkTag('canonical', canonicalUrl);
    this.upsertMetaProperty('og:url', canonicalUrl);
  }

  private upsertLinkTag(rel: string, href: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>(
      `link[rel='${rel}']`,
    );

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', rel);
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', href);
  }

  private upsertMetaProperty(property: string, content: string): void {
    let meta = this.document.head.querySelector<HTMLMetaElement>(
      `meta[property='${property}']`,
    );

    if (!meta) {
      meta = this.document.createElement('meta');
      meta.setAttribute('property', property);
      this.document.head.appendChild(meta);
    }

    meta.setAttribute('content', content);
  }
}
