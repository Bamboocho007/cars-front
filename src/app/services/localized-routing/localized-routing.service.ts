import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class LocalizedRoutingService {
  constructor(
    private router: Router,
    private translocoService: TranslocoService,
  ) {}

  private onUrlChanges() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlChunks = this.router.url.split('/');
        const activeLang = this.translocoService.getActiveLang();

        if (urlChunks[1] !== activeLang) {
          this.translocoService.setActiveLang(urlChunks[1]);
        }
      }
    });
  }

  private onLangChanges() {
    this.translocoService.langChanges$.subscribe((lang) => {
      const urlChunks = this.router.url.split('/');

      if (urlChunks[1].length && urlChunks[1] !== lang) {
        urlChunks[1] = lang;
        this.router.navigate(urlChunks);
      }
    });
  }

  public init() {
    this.onUrlChanges();
    this.onLangChanges();
  }
}
