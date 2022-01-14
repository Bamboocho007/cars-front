import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-langguage-switcher',
  templateUrl: './langguage-switcher.component.html',
  styleUrls: ['./langguage-switcher.component.scss'],
})
export class LangguageSwitcherComponent implements OnInit {
  isCollapsed = true;
  locales = this.localizeRouterService.parser.locales;
  currentUrl = '';

  constructor(
    private localizeRouterService: LocalizeRouterService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setCurrentUrl();

    this.router.events
      .pipe(
        // eslint-disable-next-line prettier/prettier
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setCurrentUrl();
      });
  }

  private setCurrentUrl(): void {
    this.currentUrl = this.router.url
      .replace('/' + this.localizeRouterService.parser.currentLang, '')
      .split('?')[0];
  }
}
