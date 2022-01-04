import { NgModule } from '@angular/core';
import { Location } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  LocalizeRouterModule,
  LocalizeParser,
  CacheMechanism,
  LocalizeRouterSettings,
} from '@gilsdav/ngx-translate-router';
import { HttpClient } from '@angular/common/http';
import { LocalizeRouterHttpLoader } from '@gilsdav/ngx-translate-router-http-loader';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export function localizeLoaderFactory(
  translate: TranslateService,
  location: Location,
  settings: LocalizeRouterSettings,
  http: HttpClient,
) {
  return new LocalizeRouterHttpLoader(
    translate,
    location,
    settings,
    http,
    '/assets/locales.json',
  );
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'disabled' }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: localizeLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient],
      },
      cacheMechanism: CacheMechanism.Cookie,
      cookieFormat: '{{value}};{{expires:20}};path=/',
      initialNavigation: true,
    }),
  ],
  exports: [RouterModule, LocalizeRouterModule],
})
export class AppRoutingModule {}
